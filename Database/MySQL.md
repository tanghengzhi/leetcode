175. Combine Two Tables
```sql
# Write your MySQL query statement below
select FirstName, LastName, City, State from Person left join Address using (PersonId)
```
176. Second Highest Salary
```sql
# Write your MySQL query statement below
select IFNULL((select distinct Salary from Employee order by Salary desc limit 1,1), null) as SecondHighestSalary;
```
177. Nth Highest Salary
```sql
CREATE FUNCTION getNthHighestSalary(N INT) RETURNS INT
BEGIN
DECLARE M INT;
SET M=N-1;
  RETURN (
      # Write your MySQL query statement below.
      select IFNULL((select distinct Salary from Employee order by Salary desc limit M, 1), null)
  );
END
```
178. Rank Scores
```sql
# Write your MySQL query statement below
select score, dense_rank() over(order by score desc) as `rank` from scores;
```
180. Consecutive Numbers
```sql
# Write your MySQL query statement below
select distinct num as ConsecutiveNums from Logs B where exists (select * from Logs A where A.id = B.id - 1 and A.num = B.num) and exists (select * from Logs C where C.id = B.id + 1 and C.num = B.num);
```
181. Employees Earning More Than Their Managers
```sql
# Write your MySQL query statement below
select e.name as Employee from Employee e join Employee m on (m.id = e.managerId) where e.managerId is not null and e.salary > m.salary;
```
182. Duplicate Emails
```sql
# Write your MySQL query statement below
select email from Person group by email having count(*) > 1;
```
183. Customers Who Never Order
```sql
# Write your MySQL query statement below
select name as Customers from Customers where not exists (select 1 from Orders where customerId = Customers.id);
```
184. Department Highest Salary
```sql
# Write your MySQL query statement below
select (select name from Department where id = e.departmentId) as Department, e.name as Employee, salary as Salary
from (
    select *, rank() over (partition by departmentId order by salary desc) as `rank` 
    from Employee
    ) e
where e.rank = 1;
```
185. Department Top Three Salaries
```sql
# Write your MySQL query statement below
select (select name from Department where id = e.departmentId) as Department, e.name as Employee, salary as Salary
from (
    select *, dense_rank() over (partition by departmentId order by salary desc) as `rank` 
    from Employee
    ) e
where e.rank <= 3;
```
196. Delete Duplicate Emails
```sql
# Write your MySQL query statement below
delete from Person where id not in (
    select id from (select min(id) as id from Person group by email) t
);
```
197. Rising Temperature
```sql
# Write your MySQL query statement below
select id from Weather t where exists (select 1 from Weather where recordDate = subdate(t.recordDate, 1) and temperature < t.temperature);
```
262. Trips and Users
```sql
# Write your MySQL query statement below
select request_at as Day, round(sum(status<>'completed') / count(*), 2) as `Cancellation Rate` from Trips 
where client_id not in (select users_id from Users where role = 'client' and banned = 'Yes') 
  and driver_id not in (select users_id from Users where role = 'driver' and banned = 'Yes')
  and request_at between '2013-10-01' and '2013-10-03'
group by Day;
```
511. Game Play Analysis I
```sql
# Write your MySQL query statement below
select player_id, min(event_date) as first_login from Activity group by player_id;
```
550. Game Play Analysis IV
```sql
# Write your MySQL query statement below
select round(count(distinct player_id) / count(*), 2) as fraction from
(
    select (select player_id from Activity where player_id = a.player_id and event_date = adddate(min(a.event_date), 1)) as player_id
    from Activity a
    group by player_id
) t;
```
570. Managers with at Least 5 Direct Reports
```sql
# Write your MySQL query statement below
select name from Employee where id in (
    select managerId from Employee
    where managerId is not null
    group by managerId
    having count(*) >= 5
);
```
577. Employee Bonus
```sql
# Write your MySQL query statement below
select name, bonus from Employee left join Bonus using(empId) where bonus is null or bonus < 1000;
```
584. Find Customer Referee
```sql
# Write your MySQL query statement below
select name from Customer where referee_id is null or referee_id <> 2;
```
585. Investments in 2016
```sql
# Write your MySQL query statement below
select round(sum(tiv_2016), 2) as tiv_2016 from Insurance t where exists (
    select * from Insurance where pid <> t.pid and tiv_2015 = t.tiv_2015
) and not exists (
    select * from Insurance where pid <> t.pid and lat = t.lat and lon = t.lon
);
```
586. Customer Placing the Largest Number of Orders
```sql
# Write your MySQL query statement below
select customer_number from Orders group by customer_number order by count(*) desc limit 1;
```
595. Big Countries
```sql
# Write your MySQL query statement below
select name, population, area from World where population >= 25000000 or area >= 3000000;
```
596. Classes More Than 5 Students
```sql
# Write your MySQL query statement below
select class from Courses group by class having count(student) >= 5;
```
601. Human Traffic of Stadium
```sql
# Write your MySQL query statement below
select id, visit_date, people from Stadium t where people >= 100 and (
    (exists (
        select 1 from Stadium where id = t.id + 1 and people >= 100
    ) and exists (
        select 1 from Stadium where id = t.id + 2 and people >= 100
    ))
    or 
    (exists (
        select 1 from Stadium where id = t.id - 1 and people >= 100
    ) and exists (
        select 1 from Stadium where id = t.id + 1 and people >= 100
    ))
    or 
    (exists (
        select 1 from Stadium where id = t.id - 1 and people >= 100
    ) and exists (
        select 1 from Stadium where id = t.id - 2 and people >= 100
    ))
);
```
602. Friend Requests II: Who Has the Most Friends
```sql
# Write your MySQL query statement below
select id, count(*) as num from (
    select requester_id as id from RequestAccepted
    union all select accepter_id as id from RequestAccepted
) t
group by id
order by num desc
limit 1;
```
607. Sales Person
```sql
# Write your MySQL query statement below
select name from SalesPerson where sales_id not in (
    select sales_id from Orders where com_id in (
        select com_id from Company where name = 'RED'
    )
);
```
608. Tree Node
```sql
# Write your MySQL query statement below
select id, (IF(p_id is null, 'Root', IF(exists (select 1 from Tree where p_id = t.id), 'Inner', 'Leaf'))) as type from Tree t;
```
610. Triangle Judgement
```sql
# Write your MySQL query statement below
select *, (IF(x + y > z and x + z > y and y + z > x, 'Yes', 'No')) as triangle from Triangle;
```
619. Biggest Single Number
```sql
# Write your MySQL query statement below
select max(num) as num from (
    select num from MyNumbers group by num having count(*) = 1
) t;
```
620. Not Boring Movies
```sql
# Write your MySQL query statement below
select * from Cinema
where id % 2 = 1 and description <> 'boring'
order by rating desc;
```
626. Exchange Seats
```sql
# Write your MySQL query statement below
select id, IFNULL(IF(id % 2 = 1, (select student from Seat where id = t.id + 1), (select student from Seat where id = t.id - 1)), t.student) as student from Seat t;
```
627. Swap Salary
```sql
# Write your MySQL query statement below
update Salary set sex = IF(sex = 'm', 'f', 'm');
```
1045. Customers Who Bought All Products
```sql
# Write your MySQL query statement below
select customer_id from Customer
group by customer_id
having count(distinct product_key) = (select count(*) from Product);
```
1050. Actors and Directors Who Cooperated At Least Three Times
```sql
# Write your MySQL query statement below
select actor_id, director_id from ActorDirector
group by actor_id, director_id
having count(*) >= 3;
```
1068. Product Sales Analysis I
```sql
# Write your MySQL query statement below
select product_name, year, price from Sales join Product using (product_id);
```
1070. Product Sales Analysis III
```sql
# Write your MySQL query statement below
select t1.product_id, t1.first_year, t2.quantity, t2.price
from (select product_id, min(year) as first_year from Sales group by product_id) t1
join Sales t2 on (t1.product_id = t2.product_id and t1.first_year = t2.year);
```
1075. Project Employees I
```sql
# Write your MySQL query statement below
select project_id, round(sum(experience_years) / count(*), 2) as average_years from Project join Employee using (employee_id) group by project_id;
```
1084. Sales Analysis III
```sql
# Write your MySQL query statement below
select product_id, product_name from Product where product_id in (
    select product_id from Sales t where sale_date between '2019-01-01' and '2019-03-31' and not exists (
        select 1 from Sales where product_id = t.product_id and sale_date not between '2019-01-01' and '2019-03-31'
    )
);
```
1141. User Activity for the Past 30 Days I
```sql
# Write your MySQL query statement below
select activity_date as day, count(distinct user_id) as active_users
from Activity
where activity_date between '2019-06-28' and '2019-07-27'
group by day;
```
1148. Article Views I
```sql
# Write your MySQL query statement below
select distinct author_id as id from Views where author_id = viewer_id order by author_id;
```
1158. Market Analysis I
```sql
# Write your MySQL query statement below
select user_id as buyer_id, join_date, (select count(*) from Orders where buyer_id = t.user_id and order_date between '2019-01-01' and '2019-12-31') as orders_in_2019 from Users t; 
```
1164. Product Price at a Given Date
```sql
# Write your MySQL query statement below
select product_id, IFNULL((select new_price from Products where product_id = t.product_id and change_date <= '2019-08-16' order by change_date desc limit 1), 10) as price
from Products t
group by product_id
```
1174. Immediate Food Delivery II
```sql
# Write your MySQL query statement below
select round(avg(immediate)*100, 2) as immediate_percentage
from (
    select order_date = customer_pref_delivery_date as immediate
    from (
        select
            customer_id,
            FIRST_VALUE(order_date)                    over w as order_date,
            FIRST_VALUE(customer_pref_delivery_date)   over w as customer_pref_delivery_date
        from Delivery
        window w as (partition by customer_id order by order_date asc)
    ) t1
    group by customer_id
) t2;
```
1179. Reformat Department Table
```sql
# Write your MySQL query statement below
select 
  id,
  sum(if(month='Jan', revenue, null)) as Jan_Revenue,
  sum(if(month='Feb', revenue, null)) as Feb_Revenue,
  sum(if(month='Mar', revenue, null)) as Mar_Revenue,
  sum(if(month='Apr', revenue, null)) as Apr_Revenue,
  sum(if(month='May', revenue, null)) as May_Revenue,
  sum(if(month='Jun', revenue, null)) as Jun_Revenue,
  sum(if(month='Jul', revenue, null)) as Jul_Revenue,
  sum(if(month='Aug', revenue, null)) as Aug_Revenue,
  sum(if(month='Sep', revenue, null)) as Sep_Revenue,
  sum(if(month='Oct', revenue, null)) as Oct_Revenue,
  sum(if(month='Nov', revenue, null)) as Nov_Revenue,
  sum(if(month='Dec', revenue, null)) as Dec_Revenue
from Department
group by id;
```
1193. Monthly Transactions I
```sql
# Write your MySQL query statement below
select
  substr(trans_date, 1, 7) as month,
  country,
  count(*) as trans_count,
  sum(state='approved') as approved_count,
  sum(amount) as trans_total_amount,
  sum(IF(state='approved', amount, 0)) as approved_total_amount
from Transactions
group by month, country;
```
