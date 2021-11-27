// Server setup
require('dotenv').config()

const express = require('express')
const cors = require('cors')
// const path = require('path')

const app = express()
app.use(express.json())
app.use(cors())

// TODO: include and initialize the rollbar library with your access token 
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, "../pages/home/home.html"))
//     // rollbar.info("HTML file server successfully setup")
// })
// app.use("/home", express.static(path.join(__dirname, "../styles/homeStyles/home.html")))

// app.use("/css", express.static(path.join(__dirname, "../styles/homeStyles/home.css")))

// app.use("/js", express.static(path.join(__dirname, "../pages/home/home.js")))


// Included JS files
const {seed} = require('./seed')

const {
    getHomePosts,
    getYourPosts
} = require('./controller')

// DEV
app.post('/seed', seed)

// HOME
app.get('/home', getHomePosts)

app.get('/createPost/yourPosts', getYourPosts)

// Listening port
const {SERVER_PORT} = process.env

app.listen(SERVER_PORT, () => console.log(`Shrek's swamp is located on ${SERVER_PORT}`))