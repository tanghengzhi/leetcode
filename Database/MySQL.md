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
select name from Employee t where managerId is null and exists (select count(*) >= 5 from Employee where managerId = t.id);
```
