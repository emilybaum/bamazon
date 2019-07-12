require('dotenv').config();
var keys = require("./keys.js");
var mysql = require("mysql");
var inquirer = require('inquirer');

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
    displayAllItems();
});


function displayAllItems() {
    // logic to display all of the items available for sale. Include the ids, names, and prices of products for sale.
    // whichitem()
    
}

function whichItem() {
    // then prompt quesitons:
            // 1. what ID of the product you would like to buy.
            // 2. how many units of the product they would like to buy
        // Take answers and feed to checkQuantity(item_id, amount)

    inquirer
        .prompt([
            // want to enter the store? (Y/N)
        ])
        .then(answers => {

        });
}
    
function checkQuantity(item_id, amount) {
    // check check if your store has enough of the product to meet the customer's request
    // if success, processOrder(item_id)
    // if not, failedOrder()
}

function failedOrder() {
    // log a phrase like Insufficient quantity!, and then prevent the order from going through.
}

function processOrder(item_id) {
    // Update the SQL database to reflect the remaining quantity.
    // Once the update goes through, show the customer the total cost of their purchase.
}

