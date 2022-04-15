module.exports = {
    sortByRank: function (x, y) {
        return (x.data.rank > y.data.rank) ? 1 : -1 ;
    }
};
