var scrape = require("../scripts/scrape.js");

var headlineCont = require("../controllers/headline.js")
var noteCont = require("../controllers/notes.js")


module.exports = function(router) {
    router.get("/", function(req, res) {
        res.render("home");
    });
    router.get("/saved", function(req, res) {
        res.render("saved");
    });

    router.get("/api/fetch", function(req, res) {
        headlineCont.fetch(function(err,docs) {
            if (!docs || docs.insertedCount === 0) {
                res.json({
                    message: "None today!"
                })
            }
            else {
                res.json({
                    message: "Added " + docs.insertedCount + " articles!"
                })
            }
        })
    });

    router.get("/api/headlines", function(req, res) {
        var query = {}
        if (req.query.saved) {
            query = req.query;
        }

        headlinesCont.get(query, function(data) {
            res.json(data);
        })
    });

    router.delete("/api/headlines/:id", function(req, res) {
        var query = {}
        query._id = req.params.id;
        headlinesCont.delete(query, function(err, data){
            res.json(data);
        })
    });

    router.patch("/api/headlines", function(req, res) {
        headlinesCont.update(req.body, function(err, data) {
            res.json(data);
        })
    });

    router.get("/api/notes/:headline_id?", function(req,res) {
        var query = {}
        if (req.params.headline_id) {
            query._id = req.params.headline_id;
        }
        noteCont.get(query, function(err, data) {
            res.json(data)
        })
    });

    router.delete("/api/notes/:id", function(req, res) {
        var query = {}
        query._id = req.params.id;
        noteCont.delete(query, function(err, data) {
            res.json(data)
        })
    });

    router.post("/api/notes", function(req, res) {
        noteCont.save(req.body, function(data){
            res.json(data)
        })
    })
}