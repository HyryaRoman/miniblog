const express = require('express')
const router = express.Router()

router.get("/", (req, res, next) => {
    res.render('browse', {
        title: "Переглянути",
        posts: [
            {id: 01, title: "Test1", text: "abcd"},
            {id: 02, title: "Test2", text: "qwerty"}
        ]
    })
})

router.get("/view/:post_id", (req, res, next) => {
    res.render('view', {
        title: req.params["post_id"],
        post_title: "Привіт",
        post_text: "# This is test for post view. *** This is markdown ***"
    })
})

router.get("/post", (req, res, next) => {
    res.render('post', {
        title: "Опублікувати"
    })
})

module.exports = router
