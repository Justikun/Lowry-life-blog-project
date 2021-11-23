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
            SELECT * from posts
        `).then(posts => {
            res.status(200).send(posts[0])
        })
        .catch(err => console.log(err))
    }
}