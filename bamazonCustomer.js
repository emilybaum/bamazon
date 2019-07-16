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
    enterStore();
});


function enterStore() {
    // logic to display all of the items available for sale. Include the ids, names, and prices of products for sale.
    inquirer
        .prompt([
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
                    disaplyAllItems(true, whichItem);
                    break;

                case "No thank you...": 
                    console.log(divider + "Well, that's a bummer");

                    connection.end();
                    break;
            }
        });
    
}

function disaplyAllItems(showDepartment, callback) {

    // display all items
    var query = "SELECT * FROM products"

    connection.query(query, function (err, res) {
        if (err) throw err;
        
        
        res.forEach(element => {
            var details = [
                "ID: " + element.item_id,
                "Product Name: " + element.product_name,
                "Price: $" + element.price,
                "Quantity Available: " + element.stock_quantity
            ]
            
            if (showDepartment === true) {
                details.push("Department: " + element.department_name)
            }

            details.join(" | ")

            console.log("\n" + details);


        });
        console.log(divider)
        callback()
    })
}


function whichItem() {
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

            connection.query("SELECT product_name, stock_quantity, price FROM products WHERE ?",
                {
                    item_id: ID
                }, function (err, res) {
                if (err) throw err

                res.forEach(element => {
                    var amountAvailable = element.stock_quantity;
                    var product = element.product_name;
                    var price = element.price;
                    console.log("element.price is next");
                    console.log(price);
                    console.log(typeof price);
                    checkQuantity(ID, product, quantityNeeded, amountAvailable, price);
                })
                    
            })
        });
}
    
function checkQuantity(ID, product, quantityNeeded, amountAvailable, price) {

    if (amountAvailable >= quantityNeeded) {
        console.log("Yay! We can fulfill your order for " + quantityNeeded + " " + product + "s!");
        processOrder(ID, quantityNeeded, amountAvailable, price);
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

function processOrder(ID, quantityNeeded, amountAvailable, price) {
    var newStock = amountAvailable - quantityNeeded;
    console.log("new stock number: " + newStock);
    connection.query("UPDATE products SET stock_quantity=? WHERE item_id=?",
        [
            newStock, ID
        ], function (err, res) {
            if (err) throw err;

            var total = quantityNeeded * price;
            console.log("The total cost for this purchase is $" + total);
            // return true;
        })
    startNewPurchase()
}

function startNewPurchase() {
inquirer
    .prompt([
        {
            name: "newPurchase",
            message: "Do you want to make annother purchase?",
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
                    console.log(divider + "Glad to have you back" + divider);
                    disaplyAllItems();
                    break;

                case "No thank you...":
                    console.log(divider + "Well, that's a bummer");

                    connection.end();
                    break;
            }
        });

}

module.exports = disaplyAllItems;

