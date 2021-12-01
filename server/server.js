// Server setup
require('dotenv').config()

const express = require('express')
const cors = require('cors')
// const path = require('path')

const app = express()
app.use(express.json())
app.use(cors())

// Included JS files
const {seed} = require('./seed')

const {
    getHomePosts,
    getYourPosts,
    postBlogPost,
    deletePost,
    editPost,
    updatePost,
    getUserInfo
} = require('./controller')

// DEV
app.post('/seed', seed)

//USERS
app.get('/getUserInfo', getUserInfo)

// HOME
app.get('/home', getHomePosts)

// All Posts
app.get('/editPost/:id', editPost)

// Post Editor
app.get('/myPosts/yourPosts', getYourPosts)
app.post('/postBlogPost', postBlogPost)
app.post('/updatePost', updatePost)

app.delete('/deletePost/:id', deletePost)

// Listening port
const {SERVER_PORT} = process.env

app.listen(SERVER_PORT, () => console.log(`Shrek's swamp is located on ${SERVER_PORT}`))