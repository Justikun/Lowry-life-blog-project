require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const {SERVER_PORT} = require('dotenv')
const {seed} = require('./seed')
//destructure functions here

app.use(express.json())
app.use(cors())