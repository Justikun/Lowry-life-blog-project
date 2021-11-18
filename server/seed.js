// //do this npm i sequelize pg pg-hstore
// require('dotenv').config()
// const {CONNECTION_STRING} = process.env
// const Sequelize = require('sequelize')

// const sequelize = new Sequelize(CONNECTION_STRING, {
//     dialect: 'postgres', 
//     dialectOptions: {
//         ssl: {
//             rejectUnauthorized: false
//         }
//     }
// })


// module.exports = {
//     seed: (req, res) => {
//         sequelize.query(/*sql*/`
        
//         DROP TABLE IF EXISTS Auth cascade;
//         DROP TABLE IF EXISTS Users cascade;
//         DROP TABLE IF EXISTS Posts cascade;
//         DROP TABLE IF EXISTS Home_Screen cascade;
//         DROP TABLE IF EXISTS Profile_Page cascade;

//         CREATE TABLE Users (
//             "user_id" serial PRIMARY KEY NOT NULL,
//             "first_name" varchar(100) NOT NULL,
//             "last_name" varchar(100) NOT NULL,
//             "bio" varchar(5000) NOT NULL,
//             "quote" varchar(225)
//         );

//         CREATE TABLE Posts (
//             "post_id" serial PRIMARY KEY NOT NULL,
//             "user_id" integer NOT NULL REFERENCES Users(user_id),
//             "post_title" varchar(255) NOT NULL,
//             "post_text" varchar(10000) NOT NULL,
//             "post_date" DATE NOT NULL
//         );

//         CREATE TABLE Auth (
//             "user_id" integer PRIMARY KEY NOT NULL REFERENCES Users(user_id),
//             "password" varchar(255) NOT NULL,
//             "email" varchar(255) NOT NULL UNIQUE
//         );

//         CREATE TABLE Home_Screen (
//             "home_id" serial PRIMARY KEY NOT NULL,
//             "post_id" integer NOT NULL REFERENCES Posts(post_id)
//         );

//         CREATE TABLE Profile_Page (
//             "user_id" integer PRIMARY KEY NOT NULL,
//             "post_id" integer NOT NULL REFERENCES Posts(post_id)
//         );

//         -- Inserting test users
//         INSERT INTO Users (first_name, last_name, bio, quote)
//         VALUES ('Justin', 'Lowry', 'Here to blog my life as a software engineer!', 'And thats the thing about life, you get to create it, design it, and live it.');
        
//         -- Inserting test posts
//         INSERT INTO Posts (user_id, post_title, post_text, post_date)
//         VALUES (1, 'I went to the Silicon Slopes tech conference today! Here is what I learned', 'Okay. This is the text content of the blog post', '2021-11-16');
        
//         -- SELECT * FROM Posts;
//         `).then(() => {
//             console.log("DB SUCCESSFULLY SEEDED!")
//             res.sendStatus(200)
//         }).catch(err => console.log("ERROR SEEDING DB", err))
//     }
// }