const express = require('express');
const router = express.Router();
const db = require('../db');

router.get("/", async (req, res, next) => {
    db.query(
        `SELECT post_id, post_title, post_desc FROM posts ORDER BY post_time DESC;`,
        (qerr, qres, qfields) => {
            if(qerr) {
                console.log(qerr);
                res.status(500).send("Error while quering recent posts!").end();
                return;
            }
            console.log(qres);
            res.render('browse', {
                title: "Блогик - сайт для мініблогів",
                page_desc: "Блогик - свйт для мініблогів. Жодної реєстрації, повна анонімність.",
                posts: qres
            });
        }
    );
});

router.get("/view/:post_id", async (req, res, next) => {
    const pid = db.connection.escape(parseInt(req.params["post_id"]));
    db.query(
        `SELECT post_title, post_desc, post_text FROM posts WHERE post_id= ${pid}`,
        (qerr, qres, qfields) => {
            if(qerr) {
                console.log(qerr);
                res.status(500).send("Error while quering post!").end();
                return;
            }
            console.log(qres);
            res.render('view', {
                title: qres[0].post_title + " - Блогик",
                page_desc: qres[0].post_desc,
                post_title: qres[0].post_title,
                post_text: qres[0].post_text
            });
        }
    );
});

router.get("/post", (req, res, next) => {
    res.render('post', {
        title: "Створити пост - Блогик",
        page_desc: "Опублікувати власний мініблог."
    });
});

module.exports = router
