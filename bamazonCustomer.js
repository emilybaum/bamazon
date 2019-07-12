require('dotenv').config();
var keys = require("./keys.js");
var mysql = require("mysql");
var inquirer = require('inquirer');
var divider = "\n--------------------------\n";

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
    inquirer
        .prompt([
            // want to enter the store? (Y/N)
            {
                name: "start",
                message: "Do you want to enter the store?",
                type: "list",
                choices: [
                    "Oh yea!",
                    "No thank you..."
                ]
            }
        ])
        .then(answer => {
            switch (answer.start) {
                case "Oh yea!": 
                    console.log("get excited!");

                    // display all items
                    var query = "SELECT * FROM products"
                    console.log(query);

                    connection.query(query, function (err, res) {
                        if (err) throw err;

                        res.forEach(element => {
                            var details = [
                                "ID: " + element.item_id, 
                                "Product Name: " + element.product_name, 
                                "Department: " + element.department_name, 
                                "Price: $" + element.price, 
                                "Quantity Available: " + element.stock_quantity
                            ].join(" | ")
                            
                            console.log(details + "\n");

                        });
                    })
                    whichitem()
                    break;

                case "No thank you...": 
                    console.log(divider + "Well, that's a bummer");

                    connection.end();
                    break;
            }
        });
    
}

function showItems() {
    
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

