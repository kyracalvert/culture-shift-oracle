const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    
});

/**
 * POST route template
 */


// post NEW WIZCARDS to database
router.post('/', (req, res) => {
    console.log("some text", req.body.cardToAdd);
    if (req.isAuthenticated()) {
        const query = `INSERT INTO "wizcards" ("user_id", "message", "img_path") 
        VALUES ($1, $2, $3);`;
        pool.query(query, [req.user.id, req.body.cardToAdd.message, req.body.cardToAdd.img_path])
        .then((results) => {
            res.sendStatus(201);
        }).catch((error)=> {
            console.log('POST to the database failed ', error);
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(403);
    }
});

module.exports = router;