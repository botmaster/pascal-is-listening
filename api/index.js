/* eslint-disable camelcase */
/* eslint-disable no-throw-literal */
/* eslint-disable no-console */
import express from 'express'
import redis from 'async-redis'
import axios from 'axios'

require('dotenv').config()

const app = express()
app.use(express.json())

const theRedisClient = null

// Redis

function connectToRedis() {

    if(theRedisClient && redisClient.connected) {
        console.log('🎉 Redis client already connected 🎉')
        return redisClient
    }

    const redisClient = redis.createClient(process.env.REDIS_URL)
    redisClient.on('connect', () => {
        console.log('\n🎉 Redis client connected 🎉\n')
    })
    redisClient.on('error', (err) => {
        console.error(`\n🚨 Redis client could not connect: ${err} 🚨\n`)
    })
    return redisClient
}

// Express app

app.all('/spotify/data/:key', async ({ params: { key }, query }, res) => {
    console.log('/spotify/data/:key', key, query)
    try {
        if (key === ('refresh_token' || 'access_token'))
            throw { error: '🔒 Cannot get protected stores. 🔒' }
        const { value } = query
        console.log(value)
        const reply = await callStorage(...storageArgs(key, { value }))
        res.send({ [key]: reply })
    } catch (err) {
        console.error(
            `\n🚨 There was an error at /api/spotify/data: ${err} 🚨\n`
        )
        res.send(err)
    }
})

function storageArgs(key, props) {
    const { expires, body, value } = props
    const val = body ? JSON.stringify(body) : value
    return [
        val ? 'set' : 'get',
        key,
        val,
        expires ? 'EX' : null,
        expires
    ].filter((arg) => Boolean(arg))
}

async function callStorage(method, ...args) {
    const redisClient = connectToRedis()
    const response = await redisClient[method](...args)

    // Check if redis is already quit
    if (redisClient.connected) {
        console.log('🚪 Closing Redis connection 🚪')
        redisClient.quit()
    }
    return response
}

app.get('/spotify/callback', async (req, res) => {
    console.log('/spotify/callback')
    const {
        query: { code }
    } = req
    console.log('/spotify/callback code: ', code)
    try {
        const { data } = await getSpotifyToken({
            code,
            grant_type: 'authorization_code'
        })
        console.log('/spotify/callback data :', data)
        const { access_token, refresh_token, expires_in } = data
        const {
            data: { id }
        } = await getUserData(access_token)

        if (id !== process.env.SPOTIFY_USER_ID)
            throw "🤖 You aren't the droid we're looking for. 🤖"

        await callStorage(...storageArgs('is_connected', { value: true }))
        await callStorage(
            ...storageArgs('refresh_token', { value: refresh_token })
        )
        await callStorage(
            ...storageArgs('access_token', {
                value: access_token,
                expires: expires_in
            })
        )

        const success = '🎉 Welcome Back 🎉'
        res.redirect(`/auth?success=${success}`)
    } catch (err) {
        console.error(
            `\n🚨 There was an error at /api/spotify/callback: ${err} 🚨\n`
        )
        res.redirect(`/auth?error=${err}`)
    }
})

const getSpotifyToken = (props = {}) => {
    console.log('getSpotifyToken() props', props)
    console.log(
        'getSpotifyToken() process.env.SPOTIFY_CLIENT_ID',
        process.env.SPOTIFY_CLIENT_ID
    )
    console.log(
        'getSpotifyToken() process.env.SPOTIFY_CLIENT_SECRET_ID',
        process.env.SPOTIFY_CLIENT_SECRET_ID ? 'OK' : 'KO'
    )
    console.log(
        'getSpotifyToken() process.env.CLIENT_URL',
        process.env.CLIENT_URL
    )
    return axios({
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        params: {
            client_id: process.env.SPOTIFY_CLIENT_ID,
            client_secret: process.env.SPOTIFY_CLIENT_SECRET_ID,
            redirect_uri: `${process.env.CLIENT_URL}/api/spotify/callback`,
            ...props
        },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

const spotifyBaseUrl = 'https://api.spotify.com/v1/'

const getUserData = (access_token) =>
    axios.get(`${spotifyBaseUrl}me`, {
        headers: {
            withCredentials: true,
            Authorization: `Bearer ${access_token}`
        }
    })

async function getAccessToken() {
    const redisClient = connectToRedis()
    const accessTokenObj = { value: await redisClient.get('access_token') }
    if (!accessTokenObj.value) {
        const refresh_token = await redisClient.get('refresh_token')
        const {
            data: { access_token, expires_in }
        } = await getSpotifyToken({
            refresh_token,
            grant_type: 'refresh_token'
        })
        Object.assign(accessTokenObj, {
            value: access_token,
            expires: expires_in
        })
        await callStorage(...storageArgs('access_token', { ...accessTokenObj }))
    }
    // Check if redis is already quit
    if (redisClient.connected) {
        console.log('🚪 Closing Redis connection 🚪')
        redisClient.quit()
    }
    return accessTokenObj.value
}

app.get('/spotify/now-playing/', async (req, res) => {
    try {
        const access_token = await getAccessToken()
        const response = await axios.get(
            `${spotifyBaseUrl}me/player/currently-playing?market=US`,
            {
                headers: {
                    withCredentials: true,
                    Authorization: `Bearer ${access_token}`
                }
            }
        )
        const { data } = response
        await setLastPlayed(access_token, data)
        const reply = await callStorage('get', 'last_played')
        res.send({
            item: JSON.parse(reply),
            is_playing: Boolean(data.is_playing),
            progress_ms: data.progress_ms || 0
        })
    } catch (err) {
        console.error(err)
        res.send({ error: err.message })
    }
})

async function setLastPlayed(access_token, item) {
    if (!item) {
        const { data } = await axios.get(
            `${spotifyBaseUrl}me/player/recently-played?market=US`,
            {
                headers: {
                    withCredentials: true,
                    Authorization: `Bearer ${access_token}`
                }
            }
        )
        postStoredTrack(data.items[0].track)
    } else {
        postStoredTrack(item.item)
    }
}

function postStoredTrack(props) {
    callStorage(
        ...storageArgs('last_played', {
            body: props
        })
    ).then((reply) => console.log('postStoredTrack reply', reply))
}

module.exports = {
    path: '/api/',
    handler: app
}
