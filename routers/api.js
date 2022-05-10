const express = require('express');
const bp = require('body-parser');
const router = express.Router();
const db = require('../db')

router.use(bp.json());
router.use(bp.urlencoded({ extended: true }));

router.post("/api/post", async (req, res, next) => {
    // res.redirect("/view/001");
    const data = req.body;
    const pname = data.post_name;
    const pdesc = data.post_text.substring(0, 255);
    const ptext = data.post_text;
    dp.query(
        `INSERT INTO posts (post_title, post_desc, post_text)
        OUTPUT Inserted.post_id
        VALUES (${pname}, ${pdesc}, ${ptext});`,
        (err, res, fields) => {
            if(err) {
                res.status(500).send("Error while inserting post into database!").end();
                return;
            }

            const pid = res["pid"];
            res.redirect(`/view/:${pid}`);
        }
    );
});

module.exports = router;
