var express = require("express"),
    app     = express(),
    port    = process.env.PORT || 3000;
    
app.use(express.static(__dirname + "/public"));
  
app.get("/", function(req, res) {
    res.redirect("/main");
});

app.get("/main", function(req, res){
    res.sendFile(__dirname + "/views/main.html");
});

app.get("/birthData2011", function(req, res){
    res.sendFile(__dirname + "/views/birthData2011.html");
});

app.get("/birthData", function(req, res){
    res.sendFile(__dirname + "/views/birthData.html");
});

app.get("/birthData2", function(req, res){
    res.sendFile(__dirname + "/views/birthData2.html");
});

app.get("/regionData", function(req, res){
    res.sendFile(__dirname + "/views/regionData.html");
});

app.get("/birthData3", function(req, res){
    res.sendFile(__dirname + "/views/birthData3.html");
});

app.get("/birthData4", function(req, res){
    res.sendFile(__dirname + "/views/birthData4.html");
});

app.get("/birthData2011_2", function(req, res){
    res.sendFile(__dirname + "/views/birthData2011_2.html");
});

app.listen(port, function() {
    console.log("Server has started at " + port);
});