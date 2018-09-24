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
// post NEW DESTINATIONS to database
router.post('/', (req, res) => {
    console.log(req.body.placeToAdd);
    res.sendStatus(200);
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