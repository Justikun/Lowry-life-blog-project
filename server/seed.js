//do this npm i sequelize pg pg-hstore
require('dotenv').config()
const {CONNECTION_STRING} = process.env
const Sequelize = require('sequelize')
const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: "postgres",
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
});


module.exports = {
    seed:(req, res) => {
        sequelize.query(/*sql*/`
        
        DROP TABLE IF EXISTS public.Users;
        DROP TABLE IF EXISTS public.Posts;
        DROP TABLE IF EXISTS public.Auth;
        DROP TABLE IF EXISTS public.Home_Screen;
        DROP TABLE IF EXISTS public.Profile_Page;

        CREATE TABLE "public.Users" (
            "user_id" serial NOT NULL,
            "first_name" varchar(100) NOT NULL,
            "last_name" varchar(100) NOT NULL,
            "bio" varchar(5000) NOT NULL,
            "quote" varchar(225),
            CONSTRAINT "Users_pk" PRIMARY KEY ("user_id")
        ) WITH (
        OIDS=FALSE
        );

        CREATE TABLE "public.Posts" (
            "post_id" serial NOT NULL,
            "user_id" integer NOT NULL,
            "post_title" varchar(255) NOT NULL,
            "post_text" varchar NOT NULL,
            "date" DATE NOT NULL,
            CONSTRAINT "Posts_pk" PRIMARY KEY ("post_id")
        ) WITH (
        OIDS=FALSE
        );



        CREATE TABLE "public.Auth" (
            "user_id" integer NOT NULL,
            "password" varchar(255) NOT NULL,
            "email" varchar(255) NOT NULL UNIQUE,
            CONSTRAINT "Auth_pk" PRIMARY KEY ("user_id")
        ) WITH (
        OIDS=FALSE
        );



        CREATE TABLE "public.Home_Screen" (
            "home_id" serial NOT NULL,
            "post_id" integer NOT NULL,
            CONSTRAINT "Home_Screen_pk" PRIMARY KEY ("home_id")
        ) WITH (
        OIDS=FALSE
        );



        CREATE TABLE "public.Profile_Page" (
            "user_id" integer NOT NULL,
            "post_id" integer NOT NULL,
            CONSTRAINT "Profile_Page_pk" PRIMARY KEY ("user_id")
        ) WITH (
        OIDS=FALSE
        );

        ALTER TABLE "Users" ADD CONSTRAINT "Users_fk0" FOREIGN KEY ("bio") REFERENCES ""("");
        ALTER TABLE "Users" ADD CONSTRAINT "Users_fk1" FOREIGN KEY ("quote") REFERENCES ""("");

        ALTER TABLE "Posts" ADD CONSTRAINT "Posts_fk0" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id");

        ALTER TABLE "Auth" ADD CONSTRAINT "Auth_fk0" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id");

        ALTER TABLE "Home_Screen" ADD CONSTRAINT "Home_Screen_fk0" FOREIGN KEY ("post_id") REFERENCES "Posts"("post_id");

        ALTER TABLE "Profile_Page" ADD CONSTRAINT "Profile_Page_fk0" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id");
        ALTER TABLE "Profile_Page" ADD CONSTRAINT "Profile_Page_fk1" FOREIGN KEY ("post_id") REFERENCES "Posts"("post_id");

        `)
        .then(() => {
            console.log("DB SUCCESSFULLY SEEDED!")
            res.sendStatus(200)
        })
        .catch(err => console.log("ERROR SEEDING DB", err))
    }
}