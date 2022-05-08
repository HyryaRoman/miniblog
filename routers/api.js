const express = require('express')
const bp = require('body-parser')
const router = express.Router()

router.use(bp.json())
router.use(bp.urlencoded({ extended: true }))

router.post("/api/post", (req, res, next) => {
    res.redirect("/view/001")
    const data = req.body
})

module.exports = router
