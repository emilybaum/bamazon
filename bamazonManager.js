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
                message: "What do you need to view?",
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
                    // viewProducts();
                    // the app should list every available item: the item IDs, names, prices, and quantities
                    break;
                
                case "View Low Inventory":
                    // viewLowInventory();
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

displayAllItems(false, managerView)

function viewProducts() {
    // display all items
    var query = "SELECT * FROM products"

    connection.query(query, function (err, res) {
        if (err) throw err;

        res.forEach(element => {
            var details = [
                "ID: " + element.item_id,
                "Product Name: " + element.product_name,
                // "Department: " + element.department_name,
                "Price: $" + element.price,
                "Quantity Available: " + element.stock_quantity
            ].join(" | ")

            console.log("\n" + details);


        });
        console.log(divider)
        managerView();
    })
}


function viewLowInventory() {
    console.log("view low inventory");
    var query = "SELECT item_id, stock_quantity FROM products";

    connection.query(query, function (err,res) {
        if (err) throw err;

        res.forEach(element => {
            var amountAvailable = element.stock_quantity;
            var ID = element.item_id;

            if (amountAvailable < 5) {
                console.log("stock is less than 5 for " + ID);
            }

        })
    })




    managerView();
}


function addToInventory() {
    console.log("add to inventory");
    managerView();

}


function addNewProduct() {
    console.log("add new product");
    managerView();

}


