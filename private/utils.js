const fs = require('fs');
const { dirname } = require('path');
const { nextTick } = require('process');
const appDir = dirname(require.main.filename);
const path = appDir + "/data/data.json";


module.exports = {
    sortByRank: function (x, y) {
        return (x.data.rank > y.data.rank) ? 1 : -1 ;
    },

    loadFile: function (req, res, next) {
        try {
            data = fs.readFileSync(path);
        } catch (error) {
            res.status(500).send('no data file !');
        }
        req.data = data
        next()
    },
};
