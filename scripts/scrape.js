var axios = require("axios");
var cheerio = require("cheerio");

var scrape = function(cb) {
    axios("https://www.animenewsnetwork.com/", function(err, res, body) {
        var $ = cheerio.load(body);

        var articles = [];

        $(".wrap").each(function(i, element){
            var head = $(this).children("<a>").text().trim();
            var summary = $(this).children(".preview").text().trim();

            if (head && sum){
                var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
                var summaryNeat = summary.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

                var dataToAdd = {
                    headline: headNeat,
                    summary: summaryNeat
                };

                articles.push(dataToAdd);
            }
        });

        cb(articles);
    })
}

module.exports = scrape;