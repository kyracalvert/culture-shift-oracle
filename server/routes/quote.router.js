const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require("axios");

/**
 * GET route template
 */
router.get('/:word', (req, res) => {
    axios({
        method: 'GET', 
        url: `http://quotes.rest/quote/image/search?category=${req.params.word}&private=false`,
        headers: { 'X-TheySaidSo-Api-Secret': process.env.API_KEY }, 
        //process.env.API_KEY will be replaced with the API key in .env file
    }) .then((results) => {
        res.send(results.data);
    }).catch((error)=> {
        console.log('GET from the API failed ', error);
        res.sendStatus(500);
    });
    
});



module.exports = router;