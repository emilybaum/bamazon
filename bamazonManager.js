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
                    // the app should list every available item: the item IDs, names, prices, and quantities
                    break;
                
                case "View Low Inventory":
                    // then it should list all items with an inventory count lower than five
                    break;

                case "Add to Inventory":
                    // your app should display a prompt that will let the manager "add more" of any item currently in the store.
                    break;

                case "Add New Product":
                    // it should allow the manager to add a completely new product to the store.
                    break;

                case "Exit":
                    console.log(divider + "Well, that's a bummer");

                    connection.end();
                    break;
            }
        })
}

