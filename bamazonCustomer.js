require('dotenv').config()
var keys = require("./keys.js");
var mysql = require("mysql");
var inquirer = require("inquirer");



var connection = mysql.createConnection({
    host: keys.databaseKeys.host,
    port: keys.databaseKeys.port,
    user: keys.databaseKeys.user,
    password: keys.databaseKeys.password,
    database: "bamazon"
});