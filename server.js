var express = require("express");
var exphbs = require("express-handlebars");
var mysql = require("mysql");
var path = require("path");

var app = express();

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"))

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "notetaker_db"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});

app.get("/", function(req, res){
    res.render("index");
})

// Root get route
app.get("/notes", function(req, res) {
  connection.query("SELECT * FROM notes;", function(err, data) {
    if (err) throw err;
    res.render("notes", { notes: data });
  });
});

// Post route -> back to home
app.post("/notes", function(req, res) {
  connection.query(`INSERT INTO notes (title, body) VALUES ('${req.body.title}', '${req.body.body}')`, function(err, result) {
    if (err) throw err;
    // send to homepage for get request
    //res.redirect("/notes");
    res.end();
  });
});

app.delete("/notes/:id", function(req, res){
    console.log(req.params.id);
    console.log(`DELETE FROM notes WHERE id=${req.params.id};`);
    connection.query(`DELETE FROM notes WHERE id=${req.params.id};`, function(err, result){
        if (err) throw err;
        // send to homepage for get request
        console.log("deleted");
        //res.redirect("/notes");
        res.end();
    });
});



// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});
