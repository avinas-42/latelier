const fs = require('fs');
const utils = require('../private/utils');

const wrongFormat = "data file wrong format"
const noPlayer = "no player for this id"

module.exports = {
    // return all players sorted by rank
    readAll(req, res) {
        try {
            req.headToHead.players = req.headToHead.players.sort(utils.sortByRank)
            res.json(req.headToHead.players);
        } catch (e) {
            res.status(500).send(wrongFormat);
        }
    },

    // return player if id exist
    read(req, res) {
        try{
            player = req.headToHead.players.find((player) => { return player.id == req.params.id });
            if (player !== undefined) {
                res.json(player);
            }
            else{
                res.status(404).send(noPlayer);
            }
        } catch (e) {
            res.status(500).send(wrongFormat);
        }
        
    },
    // return the best country by wining ratio BMI mean and median height
    stats(req, res) {
        try{
            const bestCountry = utils.bestRatioCountry(req.headToHead)
            const bmiMean = utils.bmiMean(req.headToHead);
            const medianHeight = utils.medianHeight(req.headToHead);
            const result = {
                "bestCountry" : bestCountry,
                "bmiMean" : bmiMean,
                "medianHeight" : medianHeight
            }
            res.json(result);
        } catch (e) {
            res.status(500).send(wrongFormat);
        }
        
    },
};