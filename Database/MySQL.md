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
