
const express = require('express');
const router = express.Router();
const playersController = require('../controllers/tennis');
const utils = require('../private/utils');

const usage = 'usage'
module.exports = (router) => {
    router.get('/players',  utils.loadFile, playersController.readAll);
    router.get('/player/:id', utils.loadFile, playersController.read);
    router.get('/stats', utils.loadFile, playersController.stats);
    router.get('/', (req, res) => {
        res.send('usage');
    });
}
