# SQL

## 320. SQL Commands: CREATE Table and INSERT Data

**CRUD**

> Create
>
> Read
>
> Update
>
> Delete

`https://sqliteonline.com`
SQL online para treinar

## 321. SQL Commands: READ, SELECT, and WHERE

falando sobre chaves primárias e os comendos de inserção, NOT NULL

## 322. Updating Single Vaues and Adding Columns in SQL

falando sobre o comando `update set where`

## 323. SQL Commands: DELETE

`delete from where` basicamente 

## 324. Understanding SQL Relationships, Foreign Keys and Inner Joins

```sql
id int NOT NULL,
order_number INT,
customer_id INT,
product_id INT,
PRIMARY KEY (id),
FOREIGN KEY (customer_id) REFERENCES customers(id),
FOREIGN KEY (product_id) REFERENCES products (id)
```

```sql
SELECT orders.order_number, products.name, products.price, products.stock
FROM orders
INNER JOIN products ON orders.product_id products.id
```

