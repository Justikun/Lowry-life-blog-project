//do this npm i sequelize pg pg-hstore
require('dotenv').config()
const {CONNECTION_STRING} = process.env
const Sequelize = require('sequelize')

const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres', 
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})

module.exports = {
    getHomePosts: (req, res) => {
        sequelize.query(`
            SELECT *
            FROM posts p
                INNER JOIN users u
                    ON p.user_id =  u.user_id
                ORDER BY p.post_date desc
        `).then(posts => {
            res.status(200).send(posts[0])
        })
        .catch(err => console.log(err))
    },

    getYourPosts: (req, res) => {
        sequelize.query(/*sql*/`
            SELECT *
            FROM posts p
                INNER JOIN users u
                    ON p.user_id =  u.user_id
                    WHERE p.user_id = 1    
                ORDER BY p.post_date desc
        `).then(posts => {
            res.status(200).send(posts[0])
        })
        .catch(err => console.log(err))
    },

    postBlogPost: (req, res) => {
        const {postTitle, postText} = req.body
        let post_date = new Date().toLocaleString();

        sequelize.query(/*sql*/`
            INSERT INTO Posts (user_id, post_title, post_text, post_pic, post_date)
            VALUES (1, '${postTitle}', '${postText}', 'https://i.redd.it/u105ro5rg8o31.jpg', '${post_date}')
        `).then(() => {
            console.log("post successfully posted.")
            res.sendStatus(200)
        }).catch(err => console.log(err))
    },

    deletePost: (req, res) => {
        const {id} = req.params
        sequelize.query(/*sql*/`
            DELETE FROM posts
            WHERE post_id = ${id}
        `).then(() => {
            console.log("Sucessfully deleted.")
            res.sendStatus(200)
        }).catch(err => console.log(err))
    },

    editPost: (req, res) => {
        const {id} = req.params
        sequelize.query(/*sql*/`
            SELECT * FROM posts
            WHERE post_id = ${id}
        `
        ).then(post => {
            console.log("Post fetched")
            res.status(200).send(post[0])
        }).catch(err => console.log(err))
    },

    updatePost: (req, res) => {
        const {postTitle, postText, postId} = req.body
        sequelize.query(/*sql*/`
            UPDATE posts
            SET post_title = '${postTitle}', post_text = '${postText}'
            WHERE post_id = ${postId}
        `)
        .catch(err => console.log(err))
    },

    getUserInfo: (req, res) => {
        sequelize.query(/*sql*/`
            SELECT *
            FROM users
            WHERE user_id = 1
        `)
    }
}