
const express = require('express');
const path = require('path');
const router = express.Router();
const playersController = require('../controllers/tennis');
const utils = require('../private/utils');

module.exports = (router) => {
    // response all players sorted by rank
    router.get('/players',  utils.loadFile, playersController.readAll);
    
    // response player if id exist
    router.get('/player/:id', utils.loadFile, playersController.read);
    
    // response the best country by wining ratio, BMI mean, and median height
    router.get('/stats', utils.loadFile, playersController.stats);

    // response usage
    router.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '/../public/usage.html'));
    });
}
