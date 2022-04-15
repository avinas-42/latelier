const fs = require('fs');
const utils = require('../private/utils');
const { dirname } = require('path');
const appDir = dirname(require.main.filename);
const path = appDir + "/data/data.json"
module.exports = {

    readAll(req, res) {
        data = JSON.parse(req.data);
        data.players = data.players.sort(utils.sortByRank)
        res.json(data);
    },
    read(req, res) {
        data = JSON.parse(req.data);
        player = data.players.find((player) => { return player.id == req.params.id });
        if (player !== undefined) {
            res.json(player);
        }
        else{
            res.status(404).send('no player for this id');
        }
    },
    stats(req, res) {
        data = JSON.parse(req.data);
        
        data.players = data.players.sort(utils.sortByRank)
        res.json(data);
    },

    
};