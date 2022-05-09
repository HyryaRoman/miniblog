const express = require('express');
const router = express.Router();
const db = require('../db');

let pool;

router.get("/", async (req, res, next) => {
    try {
        pool = await db.getPool();
        db.pool.query(
            `SELECT post_id, post_title, post_desc FROM posts ORDER BY post_time DESC;`,
            (err, res, fields) => {
                if(err) {
                    console.log(err);
                    res.status(500).send("Error while quering recent posts!").end();
                }
                res.render('browse', {
                    title: "Переглянути",
                    posts: posts
                });
            }
        );
    } catch (err) {
        console.log(err);
        res.status(500).send("Error while quering recent posts!").end();
    }
});

router.get("/view/:post_id", async (req, res, next) => {
    try {
        pool = await db.getPool();
        db.pool.query(
            `SELECT post_title, post_text FROM posts WHERE post_id=${req.params["post_id"]};`,
            (err, res, fields) => {
                if(err) {
                    console.log(err);
                    res.status(500).send("Error while quering post!").end();
                }
                res.render('view', {
                    title: res["post_title"],
                    post_title: res["post_title"],
                    post_text: res["post_text"]
                });
            });
    } catch (err) {
        console.log(err);
        res.status(500).send("Error while quering post!").end();
    }
});

router.get("/post", (req, res, next) => {
    res.render('post', {
        title: "Опублікувати"
    });
});

module.exports = router
