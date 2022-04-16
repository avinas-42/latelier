const fs = require('fs');
const { dirname } = require('path');
const { nextTick } = require('process');
const appDir = dirname(require.main.filename);
const path = appDir + "/data/headtohead.json";


module.exports = {
    sortByRank: function (x, y) {
        return (x.data.rank > y.data.rank) ? 1 : -1 ;
    },

    bestRatioCountry: function (headToHead) {
        countryHash = headToHead.players.reduce(function (r, a) {
            r[a.country.code] = r[a.country.code] || [];
            r[a.country.code].push(...a.data.last);
            return r;
        }, []);

        var bestCountry = ''
        var bestRatio = 0
        for (var code in countryHash) {
            countryHash[code] = countryHash[code].reduce((a, b) => a + b, 0) / countryHash[code].length            
            if (bestRatio < countryHash[code]) {
                bestRatio = countryHash[code];
                bestCountry = code;
            }
        }
        const result = {
            "code": bestCountry,
            "ratio" : bestRatio
        };
        return result;
    },

    bmiMean: function (headToHead) {
        var sumBmi = 0
        headToHead.players.forEach(player => {
            sumBmi += (player.data.weight / 1000) / ((player.data.height / 100) ** 2);
        });
        var bmiMean = sumBmi / headToHead.players.length
        return (isNaN(bmiMean)) ? -1 : bmiMean  
    },

    medianHeight: function (headToHead) {
        
        return 0
    },

    loadFile: function (req, res, next) {
        try {
            headToHead = fs.readFileSync(path);
        } catch (error) {
            res.status(500).send('no headToHead file !');
        }
        headToHead = JSON.parse(headToHead);
        req.headToHead = headToHead
        next()
    },
};
