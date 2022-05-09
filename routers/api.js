const express = require('express');
const bp = require('body-parser');
const router = express.Router();
const db = require('/db.js')

let pool;

router.use(async (req, res, next) => {
    if (pool) {
        return next();
    }
    try {
        pool = await db.getPool();
        next();
    } catch (err) {
        return next(err);
    }
});

router.use(bp.json());
router.use(bp.urlencoded({ extended: true }));

router.post("/api/post", async (req, res, next) => {
    // res.redirect("/view/001");
    const data = req.body;
    const pname = data.post_name;
    const pdesc = data.post_text.substring(0, 255);
    const ptext = data.post_text;
    try {
        pool = await db.getPool();
        const postCreationQuery = pool.query(
            `INSERT INTO posts (post_title, post_desc, post_text)
            OUTPUT Inserted.post_id
            VALUES (${pname}, ${pdesc}, ${ptext});`);

        const pid = await postCreationQuery;
        res.redirect(`/view/${pid}`);
    } catch (err) {
        res.status(500).send('Unable to create post. Hope you have saved it somewhere.').end();
    }
});

module.exports = router;
