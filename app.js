const express = require("express");
const ejs = require("ejs");
const mysql = require("mysql");
const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine","ejs");
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