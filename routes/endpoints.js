
const express = require('express');
const router = express.Router();

const playersController = require('../controllers/tennis');

module.exports = (router) => {
    router.get('/players',playersController.readAll);
    router.get('/player/:id',playersController.read);
    router.get('/', (req, res) => {
        res.send('Hello World!');
    });
}
