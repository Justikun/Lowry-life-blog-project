require('dotenv').config()
const path = require('path')
const express = require('express')
const app = express()
const cors = require('cors')
const {PORT} = process.env
const {seed} = require('./seed.js')

// For Heroku to serve my js and css
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'))
})

app.use(express.json())
app.use(cors())

// DEV
app.post('/seed', seed)

app.listen(PORT, () => console.log(`Up on ${PORT}`))