const express = require("express");
const ejs = require("ejs");
const mysql = require("mysql");
const app = express();
app.use(express.urlencoded({extended:true}));
