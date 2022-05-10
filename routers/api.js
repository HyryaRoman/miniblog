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
    db.query(
        `INSERT INTO posts (post_title, post_desc, post_text)
        OUTPUT Inserted.post_id
        VALUES (:pn, :pd, :pt);`,
        {
            pn: pname,
            pd: pdesc,
            pt: ptext
        },
        (qerr, qres, qfields) => {
            if(qerr) {
                res.status(500).send("Error while inserting post into database!").end();
                return;
            }
            console.log(qres);
            const pid = qres["pid"];
            res.redirect(`/view/:${pid}`);
        }
    );
});

module.exports = router;
