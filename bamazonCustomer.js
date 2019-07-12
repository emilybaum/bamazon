require('dotenv').config()
var keys = require("./keys.js");
var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: keys.host,
    port: keys.port,
    user: keys.user,
    password: keys.password,
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    afterConnection();
});

function afterConnection() {
    concole.log("hello")
}