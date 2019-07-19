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
                    addToInventory();
                    // your app should display a prompt that will let the manager "add more" of any item currently in the store.
                    break;

                case "Add New Product":
                    addNewProduct();
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

            if (element.stock_quantity < 5) {

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
    
    console.log(divider + "ADD TO INVENTORY");

    inquirer
        .prompt([
            {
                name: "addID",
                type: "input",
                message: "What item do you want to add items to?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            },
            {
                name: "addAmount",
                type: "input",
                message: "What quantity do you want add for this item?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ]).then(answers => {
            var ID = answers.addID;
            var addAmount = answers.addAmount;

            connection.query("SELECT stock_quantity FROM products WHERE ?",
                {
                    item_id: ID
                }, function (err, res) {
                    if (err) throw err

                    res.forEach(element => {
                        var currentInventory = element.stock_quantity;

                        makeInventoryUpdate(ID, currentInventory, addAmount)

                    })
                })
        })
}

function makeInventoryUpdate(item, currentInventory, addThisAmount) {
    var ID = item;
    var amount = parseInt(currentInventory) + parseInt(addThisAmount);

    var query = connection.query("UPDATE products SET ? WHERE ?",
        [
            {
                stock_quantity: amount
            },
            {
                item_id: ID
            }
        ], function (err, res) {
            if (err) throw err;

            console.log(divider);
            console.log("Inventory added: " + addThisAmount + "\n")
            console.log("Stock quantity updated to " + amount + " for ID: " + ID);
            console.log(divider);

            nextAction()
        })
}


function nextAction() {
    inquirer
        .prompt([
            {
                name: "addMore",
                message: "Make more changes?",
                type: "list",
                choices: [
                    "Yes - add more inventory",
                    "Yes - add more products",
                    "No, take me back to the main menu"
                ]
            }
        ])
        .then(answers => {
            switch (answers.addMore) {
                case "Yes  - add more inventory":
                    addToInventory();
                    break;

                case "Yes - add more products":
                    addNewProduct();
                    break;

                case "No, take me back to the main menu":
                    managerView();
                    break;
            }
        })
}


function addNewProduct() {
    console.log(divider + "ADD NEW PRODUCT");

    inquirer
        .prompt([
            {
                name: "productName",
                message: "Product name: ",
                type: "input"
            },
            {
                name: "productDepartment",
                message: "Department name: ",
                type: "input"
            },
            {
                name: "productPrice",
                message: "Price for item: ",
                type: "input",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            },
            {
                name: "productStock",
                message: "Stock quantity: ",
                type: "input",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ]).then(answers => {
            var productName = answers.productName;
            var productDepartment = answers.productDepartment;
            var productPrice = answers.productPrice;
            var productStock = answers.productStock;

            var query = "INSERT INTO products SET ?";
            
            connection.query(query, 
            [
                {
                    product_name: productName,
                    department_name: productDepartment,
                    price: productPrice,
                    stock_quantity: productStock
                }
            ], function (err, res) {
            if (err) throw err;

            // console.log("Rows updated in database: " + res.affectedRows);

            })

            console.log(divider);
            console.log("Product successfully added: " + productName)
            console.log(divider);

            nextAction()

        })
}


