CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (

	item_id INT NOT NULL AUTO_INCREMENT,
	product_name VARCHAR(100) NOT NULL,
	department_name VARCHAR(50) NOT NULL,
	price DECIMAL(10,2) NOT NULL,
	stock_quantity INT(100) NOT NULL,
	PRIMARY KEY (item_id)

);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Xbox One", "Video Games", "399.99", "154");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Keyboard", "Computers", "24.99", "94");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cutting Board", "Home & Kitchen", "19.99", "32");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pulp Fiction", "Movies & TV", "7.99", "7");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bass Guitar", "Musical Instruments", "79.99", "87");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Tent", "Sports & Outdoors", "49.95", "77");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Alan Wrench", "Tools & Home Improvement", "13.50", "100");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Chew Toy", "Pet Supplies", "4.95", "81");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cabernet Sauvignon", "Wine", "40.00", "20");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Batman Statue", "Collectibles & Fine Art", "89.99", "13");

SELECT * FROM products;