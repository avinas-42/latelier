const fs = require('fs');
const { dirname } = require('path');
const appDir = __dirname;
const path = appDir + "/../data/";
const noDataFile = 'no data file'

// compare two player by height
function sortByHeight(x, y) {
    return (x.data.height > y.data.height) ? 1 : -1 ;
}

module.exports = {
    // compare two player by rank
    sortByRank: function (x, y) {
        return (x.data.rank > y.data.rank) ? 1 : -1 ;
    },
    // return the best country by wining ratio
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

    // return BMI mean
    bmiMean: function (headToHead) {
        var sumBmi = 0;
        headToHead.players.forEach(player => {
            sumBmi += (player.data.weight / 1000) / ((player.data.height / 100) ** 2);
        });
        var bmiMean = sumBmi / headToHead.players.length;
        return (isNaN(bmiMean)) ? -1 : bmiMean;
    },

    // return median height
    medianHeight: function (headToHead) {
        headToHead.players = headToHead.players.sort(sortByHeight)
        if (headToHead.players.length == 0) {
            return -1;
        }
        var medianIndex = Math.floor(headToHead.players.length / 2);
        if (headToHead.players.length % 2 == 0) {
            console.log()
            return (headToHead.players[medianIndex].data.height + headToHead.players[medianIndex + 1].data.height) / 2
        }
        return headToHead.players[medianIndex].data.height;
    },
    // read and return file content
    loadFile: function (req, res, next) {
        var headToHead;
        
        try {
            headToHead = fs.readFileSync(path + process.env.DATAFILENAME);
            headToHead = JSON.parse(headToHead);
            req.headToHead = headToHead
            next()
        } catch (error) {
            res.status(500).send();
        }
    },
};
