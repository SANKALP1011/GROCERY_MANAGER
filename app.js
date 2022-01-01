const express = require("express");
const ejs = require("ejs");
const mysql = require("mysql");
const Connection = require("mysql/lib/Connection");
const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine","ejs");


var coonection = mysql.createConnection(
  {
  host: "127.0.0.1",
  user: "root",
  password: "happybarca1011",
  database: "Grocerydb"
  }
);

coonection.connect(function(err){
  if (err){
    console.log(err);
  }
  else{
    console.log("Database connected successfully");
  }
})



app.get("/",function(req,res){
  res.render("Home")
});
app.post("/",function(req,res){

});
app.get("/Login",function(req,res){
  res.render("Login");
})
app.get("/SignIn",function(req,res){
  res.render("SignIn")
});
app.post("/SignIn",function(req,res){
  res.redirect("/Insert");
});
app.get("/Insert",function(req,res){
  res.render("Insert");
});
app.post("/Insert",function(req,res){
  console.log(req.body.Name);
  res.render("Insert");
});
app.get("/Database",function(req,res){
  res.render("Database")
});
app.listen("3000",function(){
    console.log("server and uo running");
})