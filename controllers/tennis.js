const fs = require('fs');
const utils = require('../private/utils');
const { dirname } = require('path');
const appDir = dirname(require.main.filename);
const path = appDir + "/data/req.headToHead.json"
module.exports = {

    readAll(req, res) {
        req.headToHead.players = req.headToHead.players.sort(utils.sortByRank)
        res.json(req.headToHead);
    },
    read(req, res) {
        player = req.headToHead.players.find((player) => { return player.id == req.params.id });
        if (player !== undefined) {
            res.json(player);
        }
        else{
            res.status(404).send('no player for this id');
        }
    },
    stats(req, res) {
        
        const bestCountry = utils.bestRatioCountry(req.headToHead)
        const bmiMean = utils.bmiMean(req.headToHead);
        const medianHeight = utils.medianHeight(req.headToHead);
        const result = {
            "bestCountry" : bestCountry,
            "bmiMean" : bmiMean,
            "medianHeight" : medianHeight
        }
        res.json(result);
    },
};