var friends = require("../data/friends");

module.exports = function(app) {

    app.get("/api/friends", function(req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function(req, res) {
        var alike = 40;
        var match;

        for (var i=0; i < friends.length; i++) {

            var arr = [];

            for (var j=0; j < friends[i].scores.length; j++) {
                arr.push(Math.abs(friends[i].scores[j] - req.body.scores[j]));
            }

            var score = arr.reduce((comp, total) => comp + total, 0);

            if (score <= alike) {
                alike = score;
                match = friends[i];
            }
        }

        res.json(match);
        friends.push(req.body);

    });

}