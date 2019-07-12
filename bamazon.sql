DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(30) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT NOT NULL
);

-- item_id (unique id for each product)
-- product_name (Name of product)
-- department_name
-- price (cost to customer)
-- stock_quantity (how much of the product is available in stores)


