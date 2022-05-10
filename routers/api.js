const express = require('express');
const bp = require('body-parser');
const router = express.Router();
const db = require('../db')

router.use(bp.json());
router.use(bp.urlencoded({ extended: true }));

router.post("/api/post", async (req, res, next) => {
    // res.redirect("/view/001");
    const data = req.body;
    const pname = db.connection.escape(data.post_name);
    const pdesc = db.connection.escape(data.post_text.substring(0, 255));
    const ptext = db.connection.escape(data.post_text);
    db.query(
        `INSERT INTO posts (post_title, post_desc, post_text)
        VALUES (${pname}, ${pdesc}, ${ptext});
        SELECT LAST_INSERT_ID();`,
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
