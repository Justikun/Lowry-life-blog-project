// Server setup
require('dotenv').config()

const express = require('express')
const path = require('path')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

// TODO: include and initialize the rollbar library with your access token 
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "/pages/home/home.html"))
    // rollbar.info("HTML file server successfully setup")
})


// Included JS files
const {seed} = require('./seed')
const {
    getHomePosts
} = require('./controller')

// DEV
app.post('/seed', seed)

// HOME
// app.get('/home', getHomePosts) FIXME:

// Listening port
// const {SERVER_PORT} = process.env
const port = process.env.PORT || 9870

app.listen(port, () => console.log(`Shrek's swamp is located on ${port}`))