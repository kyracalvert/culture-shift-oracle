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
        url: `http://quotes.rest/quote/search?minlength=50&maxlength=300&query=${req.params.word}&private=false`,
        // `http://quotes.rest/quote/image/search?category=${req.params.word}&private=true`,
        headers: { 'X-TheySaidSo-Api-Secret': process.env.API_KEY }, 
        //process.env.API_KEY will be replaced with the API key in .env file
    }) .then((results) => {
        // Check if the result has an image...

        // if yes, return this
        res.send(results.data);

        // if not, make another axios request to the random API


    }).catch((error)=> {
        console.log('GET request to the API failed ', error);
        res.sendStatus(500);
    });
    
});



module.exports = router;