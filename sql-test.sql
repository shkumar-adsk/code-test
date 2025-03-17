-- Customer - CustId, CustName
-- Orders - OrderId, CustId, OrderAmt, yearoforder


-- Write a query to return
-- All CustId, CustName 
  -- who have placed total orders (sum of all orders) of more than 1000$ 
  -- in the year 2022

create table Customer(
  CustId INT not null,
  CustName varchar(25),
  primary key(CustId)
  );

insert into Customer values (1, 'Amazon');
insert into Customer values (2, 'Tesla');


create table Orders(
  OrderId INT Not Null,
  CustId INT Not Null,
  OrderAmt int not null,
  YearOfOrder int not null,
  primary key(OrderId),
  foreign key(CustId) references Customer(CustId)
  );
insert into Orders values (101, 1, 5000, 2022);
insert into Orders values (102, 1, 100, 2022);
insert into Orders values (103, 1, 100, 2022);
insert into Orders values (104, 2, 100, 2022);
insert into Orders values (105, 2, 1000, 2022);
insert into Orders values (106, 2, 500, 2022);
insert into Orders values (107, 1, 1000, 2023);
insert into Orders values (108, 1, 100, 2023);
insert into Orders values (109, 1, 500, 2023);


Select * from Customer;
select '---------';

Select * from Orders;
select '---------';


-- Write a query to return
-- All CustId, CustName 
  -- who have placed total orders (sum of all orders) of more than 1000$ 
  -- in the year 2022


--Write your query here
