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
        .then(answers => {
            switch (answers.start) {
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
                            
                            console.log("\n" + details);
                            

                        });
                        console.log(divider)
                        whichItem()
                    })
                    
                    break;

                case "No thank you...": 
                    console.log(divider + "Well, that's a bummer");

                    connection.end();
                    break;
            }
        });
    
}


function whichItem() {
    // then prompt quesitons:
            // 1. what ID of the product you would like to buy.
            // 2. how many units of the product they would like to buy
        // Take answers and feed to checkQuantity(item_id, amount)

    inquirer
        .prompt([
            {
                name: "whichID",
                type: "input",
                message: "What is the ID of the item you with to buy? (input number)",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            },
            {
                name: "quantityNeeded",
                type: "input",
                message: "How many of those would you like? (input number)",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ])
        .then(answers => {
            var ID = answers.whichID;
            var quantityNeeded = answers.quantityNeeded;

            connection.query("SELECT product_name, stock_quantity FROM products WHERE ?",
                {
                    item_id: ID
                }, function (err, res) {
                if (err) throw err

                res.forEach(element => {
                    var amountAvailable = element.stock_quantity;
                    var product = element.product_name;
                    checkQuantity(ID, product, quantityNeeded, amountAvailable);
                })
                    
            })
        });
}
    
function checkQuantity(ID, product, quantityNeeded, amountAvailable) {
    // check check if your store has enough of the product to meet the customer's request
    // if success, processOrder()
    // if not, failedOrder()

    if (amountAvailable >= quantityNeeded) {
        console.log("Yay! We can fulfill your order for " + quantityNeeded + " " + product + "s!");
        processOrder(ID, quantityNeeded);
    }
    else {
        var difference = quantityNeeded - amountAvailable
        failedOrder(product, difference)
    }

}

function failedOrder(product, difference) {
    console.log(divider);
    console.log("Drat! Your order failed becuause you want " + difference + " more " + product + "s than we have available right now");
    console.log("Try placing your order again");
    console.log(divider);

    // prompt the user to start their order again
    whichItem()
}

function processOrder(ID, quantityNeeded) {
    // Update the SQL database to reflect the remaining quantity.
    // Once the update goes through, show the customer the total cost of their purchase.

}

