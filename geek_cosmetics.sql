create sequence sq_orders;
create table orders(
_id int8 primary key default nextval('sq_orders'),
username varchar not null,
created_at timestamp default NOW() not null,
subtotal numeric not null,
iva numeric not null,
total numeric not null
);
create sequence sq_products;
create table products(
_id int8 primary key default nextval('sq_products'),
name varchar not null,
price numeric not null,
stock int not null,
_v smallint not null
);
create table op(
order_id int8 not null,
product_id int8 not null,
amount int not null,
subtotal numeric not null,
primary key(order_id, product_id)
);
alter table op add constraint "fk_order" foreign key (order_id) references orders(_id) on update restrict on delete cascade;
alter table op add constraint "fk_product" foreign key (product_id) references products(_id) on update restrict on delete cascade;

INSERT INTO products(name,price,stock,_v) VALUES
 ('Foam',25000,523,1)
,('Carbón Activado WIKI',18000,300,1)
,('DepilYA',10000,1000,1)
,('Mantequilla Corporal (durazno)',25000,1000,1)
,('Bronceador',40000,250,1)
,('Antiestrias',35000,300,1)
,('Despigmentante Intimo',40000,500,1)
,('Despigmentante Facial',35000,365,1)
,('Dermatónico',40000,500,1)
,('Mantequilla Corporal (frutos rojos)',25000,2000,1)
,('Mantequilla Corporal (naranja)',25000,700,1);