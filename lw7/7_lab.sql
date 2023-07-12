
create table User
(
	id int primary key not null auto_increment,
	name varchar(255),
    pass varchar(30)
);

drop database RAI;
create database RAI;
use RAI;

show tables from RAI;

select * from weapons;
select * from pizzas;
select * from turtles;

create table weapons
(
	id int primary key not null auto_increment,
    name varchar(255),
    dps int
);

create table pizzas
(
	id int primary key not null auto_increment,
    name varchar(255),
    calories double
);

create table turtles
(
	id int primary key not null auto_increment,
    name varchar(255),
    color varchar(255),
    weaponId int,
    favoritePizzaId int,
    secondFavoritePizzaId int,
    image varchar(255),
    foreign key (weaponId)  REFERENCES weapons (id) on delete set null,
    foreign key (favoritePizzaId)  REFERENCES pizzas (id) on delete set null,
    foreign key (secondFavoritePizzaId)  REFERENCES pizzas (id) on delete set null
);

insert pizzas(name,calories)
values
('pepperoni',1000),
('four cheeses',1100),
('hawaiian',1200),
('bavarian',1500);

insert weapons(name,dps)
values
('nunchaku',100),
('katana',150),
('staff',120),
('paired sai',110);

insert turtles(name,color,image,weaponId,favoritePizzaId,secondFavoritePizzaId)
values
('Leonardo','blue','leonardo.jpg',2,1,2),
('Michelangelo','orange','michelangelo.jpg',1,2,3),
('Donatello','purple','donatello.jpg',3,3,4),
('Raphael','red','raphael.jpg',4,4,1);