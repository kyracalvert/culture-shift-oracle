const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/randomplace', (req, res) => {
    const query = `SELECT "place", "description", "img_path" FROM "places" ORDER BY RANDOM() LIMIT 1;`;
    pool.query(query).then((results)=> {
        res.send(results.rows);
    }).catch((error) => {
        res.sendStatus(500);
    });
});

/**
 * POST route template
 */

// post NEW PLACES to database
router.post('/', (req, res) => {
    console.log(req.body.placeToAdd);
    if (req.isAuthenticated()) {
        const query = `INSERT INTO "places" ("user_id", "place", "description", "img_path") 
        VALUES ($1, $2, $3, $4);`;
        pool.query(query, [req.user.id, req.body.placeToAdd.place, req.body.placeToAdd.description, req.body.placeToAdd.img_path])
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