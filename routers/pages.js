const express = require('express');
const router = express.Router();
const db = require('../db');

let pool;

router.get("/", async (req, res, next) => {
    try {
        pool = await db.getPool();
        let posts = await db.pool.query(
            `SELECT post_id, post_title, post_desc FROM posts ORDER BY post_time DESC;`
        ); 
        res.render('browse', {
            title: "Переглянути",
            posts: posts
        });
    }  catch (err) {
        res.status(500).send('Error: can\`t connect to database').end();
    }
});

router.get("/view/:post_id", async (req, res, next) => {
    try {
        pool = await db.getPool();
        let post = await db.pool.query(
            `SELECT post_title, post_text FROM posts WHERE post_id=${req.params["post_id"]};`
        ); 
        res.render('view', {
            title: post["post_title"],
            post_title: post["post_title"],
            post_text: post["post_text"]
        });
    } catch (err) {
        res.status(500).send('Error: can\`t connect to database').end();
    }
});

router.get("/post", (req, res, next) => {
    res.render('post', {
        title: "Опублікувати"
    });
});

module.exports = router
