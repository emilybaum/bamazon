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
    managerView();
});

function managerView() {
    inquirer
        .prompt([
            {
                name: "start",
                message: "What would you like to do?",
                type: "list",
                choices: [
                    "View Products for Sale",
                    "View Low Inventory",
                    "Add to Inventory",
                    "Add New Product",
                    "Exit"
                ]
            }
        ]).then(answers => {
            switch (answers.start) {
                case "View Products for Sale":
                    viewProducts();
                    // the app should list every available item: the item IDs, names, prices, and quantities
                    break;
                
                case "View Low Inventory":
                    console.log("ITEMS WITH LOW INVENTORY");
                    viewLowInventory();
                    // then it should list all items with an inventory count lower than five
                    break;

                case "Add to Inventory":
                    // addToInventory();
                    // your app should display a prompt that will let the manager "add more" of any item currently in the store.
                    break;

                case "Add New Product":
                    // addNewProduct();
                    // it should allow the manager to add a completely new product to the store.
                    break;

                case "Exit":
                    console.log(divider + "Exited manager view");

                    connection.end();
                    break;
            }
        })
}

// displayAllItems(false, managerView)

function viewProducts() {
    // display all items
    var query = "SELECT * FROM products";

    connection.query(query, function (err, res) {
        if (err) throw err;

        res.forEach(element => {
            var details = [
                "ID: " + element.item_id,
                "Product Name: " + element.product_name,
                "Price: $" + element.price,
                "Quantity Available: " + element.stock_quantity
            ].join(" | ");

            console.log("\n" + details);


        });
        console.log(divider)
        managerView();
    })
}


function viewLowInventory() {
    console.log(divider + "ITEMS WITH LOW INVENTORY:")
    var query = "SELECT item_id, product_name, stock_quantity FROM products";

    connection.query(query, function (err,res) {
        if (err) throw err;

        res.forEach(element => {
            var ID = element.item_id;

            if (element.stock_quantity < 20) {

                var details = [
                    "ID: " + element.item_id,
                    "Product Name: " + element.product_name,
                    "Quantity Available: " + element.stock_quantity
                ].join(" | ")
                console.log("\n" + details);
            }           
        })
        console.log(divider)
        managerView();
    })
}


function addToInventory() {
    console.log(divider + "ADD TO INVENTORY:");
    managerView();

}


function addNewProduct() {
    console.log("add new product");
    managerView();

}


