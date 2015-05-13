var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));

var views = path.join(process.cwd(), "views");

var urls = ["http://www.google.com", "http://www.reddit.com"];

app.get("/", function(req, res) {
    var homePath = path.join(views, "home.html");
    res.sendFile(homePath);
});

app.get("/urls", function(req, res) {
    var output = [];
    for (var url in urls) output.push("<a href='" + urls[url] + "'>" + urls[url] + "</a>");
    res.send(output.join("<br>"));
});

app.post("/urls", function(req, res) {
    var url = req.body.url;
    if (!url.match('http')) url = "http://" + url;
    // console.log(url);
    var id = urls.length;
    urls.push(url);
    // console.log(urls.join(', '));
    // console.log(urls[id]);
    short_url = "http://localhost:3000/urls/" + id;
    res.send("<a href='" + short_url + "'>" + short_url + "</a>" + " now points to " + "<a href='" + url + "'>" + url + "</a>");
});

app.get("/urls/:id", function(req, res) {
    if (urls[req.params.id]) {
        // console.log(urls[req.params.id]);
        var url = urls[req.params.id];
        // if (url.toString().match('http')) res.redirect(urls[req.params.id]);
        // else res.redirect("http://"+urls[req.params.id]);
        res.redirect(urls[req.params.id]);
    }
    else res.send("invalid ID");
});

app.listen(3000, function(req, res) {
    console.log("working!!");
});
