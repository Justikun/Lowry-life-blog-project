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
    seed: (req, res) => {
        sequelize.query(/*sql*/`
        
        DROP TABLE IF EXISTS Auth cascade;
        DROP TABLE IF EXISTS Users cascade;
        DROP TABLE IF EXISTS Posts cascade;
        DROP TABLE IF EXISTS Home_Screen cascade;
        DROP TABLE IF EXISTS Profile_Page cascade;

        CREATE TABLE Users (
            "user_id" serial PRIMARY KEY NOT NULL,
            "first_name" varchar(100) NOT NULL,
            "last_name" varchar(100) NOT NULL,
            "bio" varchar(5000) NOT NULL,
            "quote" varchar(225),
            "profile_pic" varchar(1000) NOT NULL
        );

        CREATE TABLE Posts (
            "post_id" serial PRIMARY KEY NOT NULL,
            "user_id" integer NOT NULL REFERENCES Users(user_id),
            "post_title" varchar(255) NOT NULL,
            "post_text" varchar(10000) NOT NULL,
            "post_pic" varchar(1000) NOT NULL,
            "post_date" timestamp NOT NULL
        );

        CREATE TABLE Auth (
            "user_id" integer PRIMARY KEY NOT NULL REFERENCES Users(user_id),
            "password" varchar(255) NOT NULL,
            "email" varchar(255) NOT NULL UNIQUE
        );

        CREATE TABLE Home_Screen (
            "home_id" serial PRIMARY KEY NOT NULL,
            "post_id" integer NOT NULL REFERENCES Posts(post_id)
        );

        CREATE TABLE Profile_Page (
            "user_id" integer PRIMARY KEY NOT NULL,
            "post_id" integer NOT NULL REFERENCES Posts(post_id)
        );

        -- Inserting test users
        INSERT INTO Users (first_name, last_name, bio, quote, profile_pic)
        VALUES ('Sabrina', 'Molu', 'Welcome to my blog!', 'Hair, beauty, skin', 'https://images-na.ssl-images-amazon.com/images/S/influencer-profile-image-prod/logo/influencer-f59a5cbb_1594336804430_original._CR0,350,1400,1400_._FMjpg_._SS205_.jpeg'),
        ('Cassey', 'Ho', 'CEO Head designer of Popflex Active', '', 'https://thumbor.forbes.com/thumbor/fit-in/416x416/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F58d2ca18a7ea431f321b96d7%2F0x0.jpg%3Fbackground%3D000000%26cropX1%3D535%26cropX2%3D1533%26cropY1%3D236%26cropY2%3D1235'),
        ('Steve', 'Cook', 'Fitness Culture Owner. Fitness influencer', '', 'https://totalshape.com/wp-content/uploads/2021/04/portrait-image-of-steve-cook.jpg'),
        ('Morgan', 'Moroney', 'Australian fitnes influencer. Soon to marry Steve;)', '', 'https://images.gr-assets.com/users/1600933345p6/121928436.jpg');

        -- Inserting test posts
        INSERT INTO Posts (user_id, post_title, post_text, post_pic, post_date)
        VALUES (1, 'My Baby Registry Must-Haves', 'My Honest Review of the Most Popular Tinted Moisturizers. The baby registry – one of the most exciting and exhausting parts of the pregnancy process. If this is your first baby, you may be overwhelmed with all of the things that you need.I’ve created my list after reviewing 9 (yes NINE) of my friend’s lists, reading reviews on what they said after 6 months (did they actually use this), and finally my own research.This list is a compilation of all of that and more. Take it as a starting point, a final check, or if you’re looking to help someone else build their registry.', 'https://asekybonnaire.com/wp-content/uploads/2018/07/4a6d8a0f-9729-40b9-ba1b-d62e10694eb6.jpg', '2021-1-23 01:50:02'),
        (1, 'The Amazon Travel Item That You’ve Been Seeing All Over IG', 'Travel season is upon us and whether you’re stocking up on swimwear or buried in blankets, you need to know about the accessory that everyone is talking about. After using this for a couple months, I’m confident in my review and I know that you’ll love it too. I’ll cut to the chase and let you know that it’s under $20 and from your favorite doorstep fairy, Amazon. You’re welcome.', 'https://www.adsmurai.com/hs-fs/hubfs/Instagram%20Shopping/IG-Shopping-Checkout-mockup-01-(1920x1080).jpg?width=1920&name=IG-Shopping-Checkout-mockup-01-(1920x1080).jpg', '2021-9-15 12:01:23'),
        (1, 'Everything I Bought & Loved From Amazon This Month', 'So I’ve been working on a 7 days of sunscreen series where I test out mineral sunscreens on my darker skin to test them for white cast, greasiness, smell, and texture. I’ve only tested 4 so far, but spoiler alert: this one is the one to beat. So far it’s been the best option and the most affordable! Snag this from Amazon while you can. ', 'https://miro.medium.com/max/2000/1*O0AbyXnCoyqcug4Nuds8Hw.png', '2021-11-11 12:01:23'),
        (2, 'The Best Spots To Visit In Miami', 'Aside from beaches and resorts, what makes Miami truly different is that you feel transported outside of the US. In a quick 90 minute flight, you’re surrounded by the best international cuisines, white sand beaches, luxury resorts, and a cultural haven with diverse population. Just like any vacation, you can make Miami happen on any budget. You can backpack through Europe or you can stay at chalets and castles, dining only on the finest wine and cheese.Since Sahir and I are both entrepreneurs, we don’t really get vacations – we have to take them. So we tend to stay at nicer resorts with better amenities and treat ourselves to fine dining. This is what we save our points for!Here are my favorite things Miami', 'https://www.outfrontmedia.com/-/media/images/ofm/markets/miami/miami-hero.jpg', '2021-11-20 12:01:23'),
        (3, 'I want to avoid fitness misinformation, but I’m not sure how.', 'YES this is such a good question. The internet is such a blessing and a curse, right? On one hand, we have access to endless information. But on the other hand… we have access to endless information. It’s really hard sometimes to figure out what’s true vs. what is just clickbait like you said, or straight up fitness misinformation. Sorting through can be exhausting, and I think that’s why so many people give up on healthy eating and exercise before they even get started! This was true for me for a loonnng time too. I lost count of how many diet and workout “tricks” I tried before I finally figured it out. Here’s what I’ve learned!', 'https://www.teahub.io/photos/full/218-2186977_fitness-culture-steve-cook.jpg', '2021-11-28 12:01:23'),
        (4, 'The Best Travel Shoes That Are Comfortable & Cute', 'I love exploring cities when I visit. I’m the person that wants to be out on the town right after breakfast and not return to the room until nightfall. The problem is that my feet usually can’t keep up with my “can-do” attitude. I did so much research before this trip. Like, ridiculous amounts of research. My Google search history is embarrassing. I realized that I really liked the look of White Converse shoes, but when I wore them I realized that they nail “cute” but “comfort” is not their thing. Fair enough. Then I found', 'https://i.shgcdn.com/e16e0efd-b63a-44d8-a98b-991de3fa3635/-/format/auto/-/preview/3000x3000/-/quality/lighter/', '2021-11-24 11:20:00');
        `).then(() => {
            console.log("DB SUCCESSFULLY SEEDED!")
            res.sendStatus(200)
        }).catch(err => console.log("ERROR SEEDING DB", err))
    }
}