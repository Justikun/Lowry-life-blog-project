require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const {SERVER_PORT} = process.env
const {seed} = require('./seed.js')

app.use(express.json())
app.use(cors())

// DEV
app.post('/seed', seed)

app.listen(SERVER_PORT, () => console.log(`Up on ${SERVER_PORT}`))