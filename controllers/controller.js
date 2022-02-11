const controller = {

    getFavicon: function (req, res) {
        res.status(204);
    },

    getIndex: function(req, res) {
        res.render('index', {});
    },
    
    /*  Samples from previous Mini Challenge
    getCheckRefNo: function(req, res) {
        // your code here
        var query = {refno: req.query.refno};
        var projection = 'refno';

        db.findOne(Transaction, query, projection, function(result) {
            res.send(result);
        });
    },

    getAdd: function(req, res) {
        // your code here
        var query = req.query.transaction;

        db.insertOne(Transaction, query, function(result) {
            res.send(result);
        });
    },

    getDelete: function (req, res) {
        // your code here
        var query = {refno: req.query.refno};

        db.deleteOne(Transaction, query, function(result) {
            res.send(result);
        });
    }
    */
}

module.exports = controller;
