/* Requiring express module */
const express = require("express");
/* Requiring ejs module */
const ejs = require("ejs");
/* Requiring mysql module */
const mysql = require("mysql");
/* creating app */
const bycrpyt = require("bcrypt");
/* creating app */
const app = express();
/* Express embeded body-parser */
app.use(express.urlencoded({ extended: true }));
/* Adding static file */
app.use(express.static(__dirname + "/public"));
/* Setting ejs as the view engine */
app.set("view engine", "ejs");

/* Coonecting to local mysql database using the credentials*/
var dbConfig = {
  host: "us-cdbr-east-05.cleardb.net",
  user: "b9339d8e6ad7e8",
  password: "f5a0438b",
  database: "heroku_82e0818920d6a5b",
};

/* To run on your local machine */
//Connection on the local machiene-:
// var coonection = mysql.createConnection({
//   host: "127.0.0.1",
//   user: "root",
//   password: "",
//   database:  "Grocerydb",

/* This handles the error when the database connection is lost */
function handleDisconnect() {
  coonection = mysql.createConnection(dbConfig); //Creating and recreating the connection when the connection is lost or
  coonection.connect(function (err) {
    // The server is either down
    if (err) {
      //  or restarting (takes a while sometimes).
      console.log("error when connecting to db:", err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect and solve the issue.
    } else {
      console.log("Database connected successfully"); //This lines shows if the database is connected successfully.
    }
  });
  coonection.on("error", function (err) {
    console.log("db error", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      // If it gets the following error(when coonection is lost), then
      handleDisconnect(); // We will call the function and restart the connection again.
    } else {
      // Otherwise throw the error and then again the call the function.
      throw err; // Handles error
    }
  });
}
handleDisconnect();  //Calling the function again to fix the server lost issue.

/* Home Route */
app.get("/", function (req, res) {
  res.render("Home");
});
app.post("/", function (req, res) {
  //Nothing for the post route.
});

/* Login Route */
app.get("/Login", function (req, res) {
  res.render("Login");
});
app.post("/Login", function (req, res) {
  var email = req.body.Email;
  //Quering the databse for the alredy regidtered user.
  var Login = "select* from Users where Email = ?";
  coonection.query(Login, [email], function (err, result) {
    if (result.length != 0) {
      console.log("Logged");
      res.render("Insert");
    } else {
      console.log("User not registered");
      res.redirect("/SignIn");
    }
  });
});

/* Sign In Route */
app.get("/SignIn", function (req, res) {
  res.render("SignIn");
});
app.post("/SignIn", function (req, res) {
  var email = req.body.Email;
  var FullName = req.body.FullName;
  var UserName = req.body.CompanyName;
  var Password = req.body.Password;
  //Adding the user to the database.
  bycrpyt.hash(Password,10,function(err,hash){
    var Register =
    "Insert into Users(FullName,UserName,Email,Password) VALUES ('" +
    FullName +
    "','" +
    UserName +
    "','" +
    email +
    "','" +
    hash +
    "')";
  coonection.query(Register, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log("Successfully registered");
      res.render("Insert");
    }
  });
  })
  
});

/* Insert Route */
app.get("/Insert", function (req, res) {
  res.render("Insert");
});
app.post("/Insert", function (req, res) {
  console.log(req.body.Name);
  var Id = req.body.ID;
  var name = req.body.Name;
  var Type = req.body.Type;
  var Qty = req.body.Qty;
  var Price = req.body.Price;
  //Adding the items to the database.
  var Add =
    "Insert into Items(Id,Name,Type,Qty,Price) VALUES ('" +
    Id +
    "','" +
    name +
    "','" +
    Type +
    "','" +
    Qty +
    "','" +
    Price +
    "')";
  coonection.query(Add, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log("Added successfully");
    }
  });
  res.redirect("/Database");
});

/* Database Route */
app.get("/Database", function (req, res) {
  //Fetching information from the database.
  var data = "select * from Items";
  coonection.query(data, function (err, result, data) {
    if (err) {
      console.log(err);
    } else {
      res.render("Database", {
        DatabaseItem: result,
      });
    }
  });
});
app.get("/Delete/:ID", function (req, res) {
  //Deleting the value from database using the id.
  var id = req.params.ID;
  var query = "Delete from Items where id = ?";
  coonection.query(query, [id], function (err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log("Deleted from the database");
    }
    res.redirect("/Database");
  });
});

/* Search Route */
app.get("/Search", function (req, res) {
  res.render("Search");
});
app.post("/Search", function (req, res) {
  //Seaching the data which the user want from the database.
  console.log(req.body.SearchedText);
  var SearchedName = req.body.SearchedText;
  var SearchResult = "Select * from Items where Name = ?";
  coonection.query(SearchResult, [SearchedName], function (err, result) {
    if (err) {
      console.log(err);
      res.redirect("/Insert");
    } else {
      for (var i = 0; i < result.length; i++) {
        res.render("Result", {
          ID: result[i].ID,
          Name: result[i].Name,
          Type: result[i].Type,
          Qty: result[i].Qty,
          Price: result[i].Price,
        });
      }
    }
  });
});

/* Initialising the server */
app.listen(process.env.PORT || "3001", function () {
  console.log("server and up running");
});
