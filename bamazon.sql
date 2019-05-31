CREATE DATABASE bamazon_db;

use bamazon_db;

CREATE TABLE products (
    item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR (20),
    department_naem VARCHAR(20)
    price INTEGER(10),
    stock_quantity INTEGER(10),
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_naem, price, stock_quantity) values ('fishing pole', 'sports', '100.00', '50');
INSERT INTO products (product_name, department_naem, price, stock_quantity) values ('pillow', 'furniture', '15.15', '120');
INSERT INTO products (product_name, department_naem, price, stock_quantity) values ('t-shirt', 'clothes', '10.00', '95');
INSERT INTO products (product_name, department_naem, price, stock_quantity) values ('bow', 'hunting', '980.00', '34');
INSERT INTO products (product_name, department_naem, price, stock_quantity) values ('xbox', 'electronics', '295.99', '40');
INSERT INTO products (product_name, department_naem, price, stock_quantity) values ('tv', 'electronics', '1500.00', '23');
INSERT INTO products (product_name, department_naem, price, stock_quantity) values ('toothpaste', 'hygene', '5.00', '50');
INSERT INTO products (product_name, department_naem, price, stock_quantity) values ('beans', 'food', '.50', '100');
INSERT INTO products (product_name, department_naem, price, stock_quantity) values ('football', 'sports', '12.00', '32');
INSERT INTO products (product_name, department_naem, price, stock_quantity) values ('jerky', 'food', '8.00', '54');
