const fs = require('fs');
const utils = require('../private/utils');
const path = "../data/data.json"
module.exports = {

    readAll(req, res) {
        fs.promises.readFile(path)
            .then(function (result) {
                result = JSON.parse(result);
                result = result.sort(utils.sortByRank)
                console.log(result.players);

                res.set('Content-Type', 'text/json');
                res.send(result.players);

            })
            .catch(function (error) {
                console.log(error);
                res.set('Content-Type', 'text/html');
                res.send(error);
            })
    },
};