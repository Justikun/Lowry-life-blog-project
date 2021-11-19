// Server setup
// require('dotenv').config()
// const {CONNECTION_STRING} = process.env

// Inline sequel
// const Sequelize = require('sequelize')
// const sequelize = new Sequelize(CONNECTION_STRING, {
//     dialect: 'postgres',
//     dialectOption: {
//         ssl: {
//             rejectUnauthorized: false
//         }
//     }
// })


module.exports = {
    getHomePosts: (req, res) => {
        // sequelize.query(/*sql*/`
        // SELECT *
        // FROM Posts;
        // `)
        // .then(dbRes => {
        //     res.status(200).send(dbRes[0])
        // })
        // .catch(err => console.log(err))
    }
}