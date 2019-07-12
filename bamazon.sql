DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(30) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT NOT NULL,
    PRIMARY KEY (item_id)
);


INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 
    ("Folding Chair" , "Home & Kitchen", 10.75, 100),
    ("Cashmere Blanket" , "Home & Kitchen", 199.99, 50),  
    ("Side Table" , "Home & Kitchen", 75.80, 34), 
    ("Coffee Table" , "Home & Kitchen", 299, 14), 
    ("6-Piece Knife Set" , "Home & Kitchen", 139.50, 120), 
    ("Shower Curtain" , "Bathroom", 10.99, 100), 
    ("Shampoo" , "Bathroom", 5.88, 50), 
    ("iPhone Charger" , "Technology", 15.98, 45), 
    ("MacBook Skin" , "Technology", 6.99, 50), 
    ("HDMI Adapter" , "Technology", 7.00, 50), 
    ("Bath Mat" , "Bathroom", 10.00, 50);


