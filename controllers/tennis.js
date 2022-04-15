const fs = require('fs');
const utils = require('../private/utils');
const { dirname } = require('path');
const appDir = dirname(require.main.filename);
const path = appDir + "/data/data.json"
module.exports = {

    readAll(req, res) {
        fs.promises.readFile(path)
            .then(function (data) {
                data = JSON.parse(data);
                data.players = data.players.sort(utils.sortByRank)
                res.json(data);

            })
            .catch(function (error) {
                console.log(error);
                res.status(500).send('no data file!');
            })
    },
    read(req, res) {
        fs.promises.readFile(path)
            .then(function (data) {
                data = JSON.parse(data);
                player = data.players.find((player) => { return player.id == req.params.id });
                if (player !== undefined) {
                    res.json(player);
                }
                else{
                    res.status(404).send('no player for this id');
                }
                
            })
            .catch(function (error) {
                console.log(error);
                res.status(500).send('no data file !');
            })
    },
};