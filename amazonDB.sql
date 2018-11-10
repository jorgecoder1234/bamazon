DROP DATABASE IF EXISTS  amazonDB ;

CREATE database amazonDB;

USE amazonDB;

CREATE TABLE products (
  item_id INT(10) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(50) NOT NULL,
  department_name VARCHAR(50) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT (50) NOT NULL,
  PRIMARY KEY (item_id)
);

SELECT * FROM amazonDB.products;

insert into amazonDB.products(item_id,product_name,department_name,price,stock_quantity)
values(1006,"Skater Pink","Girl Fashion",749.00,2);

insert into amazonDB.products(item_id,product_name,department_name,price,stock_quantity)
values(2789, "Xbox", "Electronics", 4567.34, 6);

insert into amazonDB.products(item_id,product_name,department_name,price,stock_quantity)
values(2908, "Amazon Kindle", "Electronics", 1005.06, 10);

insert into amazonDB.products(item_id,product_name,department_name,price,stock_quantity)
values(3222, "Bose Speakers", "Audio", 549.00, 3);

insert into amazonDB.products(item_id,product_name,department_name,price,stock_quantity)
values(3384, "Galaxy Note" , "Computers", 2007.80, 2);

insert into amazonDB.products(item_id,product_name,department_name,price,stock_quantity)
values(3765, "TV Samsung", "Electronics", 13895.08, 6);

insert into amazonDB.products(item_id,product_name,department_name,price,stock_quantity)
values(3785, "Ipad 6", "Computers", 10005.06, 7);

insert into amazonDB.products(item_id,product_name,department_name,price,stock_quantity)
values(27853, "Apple Iphone 6", "Cell Phones", 7003.20, 3);
