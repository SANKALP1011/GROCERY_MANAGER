create database heroku_82e0818920d6a5b ;
use heroku_82e0818920d6a5b;

create table Users(
FullName varchar(150),
UserName varchar(150),
Email varchar(100),
Password varchar(100)
);
drop table Users;
describe Users;
select* from Users;
delete from Users;
create table Items(
ID int primary key,
Name varchar(100),
Type varchar(100),
Qty int,
Price int
);
describe Items;
SELECT* FROM Items;
delete from Items;
