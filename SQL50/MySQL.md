# SQL 50

## Select

### Recyclable and Low Fat Products

```sql
# Write your MySQL query statement below
select product_id from Products where low_fats = 'Y' and recyclable = 'Y';
```

### Find Customer Referee

```sql
# Write your MySQL query statement below
select name from Customer where referee_id is null or referee_id <> 2;
```

### Big Countries

```sql
# Write your MySQL query statement below
select name, population, area from World where population >= 25000000 or area >= 3000000;
```

### Article Views I

```sql
# Write your MySQL query statement below
select distinct author_id as id from Views where author_id = viewer_id order by author_id;
```

### Invalid Tweets

> Beats 18.56%

```sql
# Write your MySQL query statement below
select tweet_id from Tweets where length(content) > 15;
```

> Beats 93.39%

```sql
# Write your MySQL query statement below
select tweet_id from Tweets where char_length(content) > 15;
```

## Basic Joins

### Replace Employee ID With The Unique Identifier

> Beats 44.81%

```sql
# Write your MySQL query statement below
select unique_id, name from Employees left join EmployeeUNI using (id);
```

### Product Sales Analysis I

> Beats 98.16%

```sql
# Write your MySQL query statement below
select product_name, year, price from Sales join Product using (product_id);
```

### Customer Who Visited but Did Not Make Any Transactions

> Beats 64.72%

```sql
# Write your MySQL query statement below
select customer_id, sum(transaction_id is null) as count_no_trans
from Visits left join Transactions using(visit_id)
group by customer_id
having count_no_trans > 0;
```

### Rising Temperature

> Beats 83.30%

```sql
# Write your MySQL query statement below
select id from Weather t where exists (select 1 from Weather where recordDate = subdate(t.recordDate, 1) and temperature < t.temperature);
```

### Average Time of Process per Machine

> Beats 69.95%

```sql
# Write your MySQL query statement below
select machine_id, round((sum(IF(activity_type='end', timestamp, null)) - sum(IF(activity_type='start', timestamp, null))) / (count(*) / 2), 3) as processing_time
from Activity
group by machine_id;
```

### Employee Bonus

> Beats 10.47%

```sql
# Write your MySQL query statement below
select name, bonus from Employee left join Bonus using(empId) where bonus is null or bonus < 1000;
```
### Students and Examinations

> Beats 7.44%

```sql
# Write your MySQL query statement below
select Students.*, Subjects.*, IFNULL(t.attended_exams, 0) as attended_exams
from Students
cross join Subjects
left join (select student_id, subject_name, count(*) as attended_exams from Examinations group by student_id, subject_name) t
on (t.student_id = Students.student_id and t.subject_name = Subjects.subject_name)
order by student_id, subject_name;
```

### Managers with at Least 5 Direct Reports

> Beats 5.64%

```sql
# Write your MySQL query statement below
select name from Employee where id in (
    select managerId from Employee
    where managerId is not null
    group by managerId
    having count(*) >= 5
);
```

### Confirmation Rate

> Beats 85.74%

```sql
# Write your MySQL query statement below
select s.user_id, ifnull(round(sum(action='confirmed') / count(*), 2), 0) as confirmation_rate
from Signups s
left join Confirmations c using (user_id)
group by user_id;
```

## Basic Aggregate Functions

### Not Boring Movies

> Beats 83.25%

```sql
# Write your MySQL query statement below
select * from Cinema
where id % 2 = 1 and description <> 'boring'
order by rating desc;
```

### Average Selling Price

> Beats 17.47%

```sql
# Write your MySQL query statement below
select product_id, ifnull(round(sum(price*units) / sum(units), 2), 0) as average_price from
(
select product_id, price, (select sum(units) from UnitsSold where product_id = p.product_id and purchase_date between p.start_date and p.end_date) as units from Prices p
) t
group by product_id;
```

### Project Employees I

> Beats 64.12%

```sql
# Write your MySQL query statement below
select project_id, round(avg(experience_years), 2) as average_years from Project left join Employee using (employee_id) group by project_id;
```

### Percentage of Users Attended a Contest

> Beats 90.91%

```sql
# Write your MySQL query statement below
select contest_id, round(count(*) / (select count(*) from Users) * 100, 2) as percentage
from Register
group by contest_id
order by percentage desc, contest_id asc;
```

### Queries Quality and Percentage

> Beats 57.28%

```sql
# Write your MySQL query statement below
select 
  query_name,
  round(avg(rating / position), 2) as quality,
  round(avg(case when rating < 3 then 1 else 0 end) * 100, 2) as poor_query_percentage
from Queries
group by query_name;
```

### Monthly Transactions I

> Beats 64.73%

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

### Immediate Food Delivery II

> Beats 48.11%

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

### Game Play Analysis IV

> Beats 5.01%

```sql
# Write your MySQL query statement below
select round(count(distinct player_id) / count(*), 2) as fraction from
(
    select (select player_id from Activity where player_id = a.player_id and event_date = adddate(min(a.event_date), 1)) as player_id
    from Activity a
    group by player_id
) t;
```

## Sorting and Grouping

### Number of Unique Subjects Taught by Each Teacher

> Beats 92.02%

```sql
# Write your MySQL query statement below
select teacher_id, count(distinct subject_id) as cnt
from Teacher
group by teacher_id;
```

### User Activity for the Past 30 Days I

> Beats 75.23%

```sql
# Write your MySQL query statement below
select activity_date as day, count(distinct user_id) as active_users
from Activity
where activity_date between '2019-06-28' and '2019-07-27'
group by day;
```

### Product Sales Analysis III

> Beats 32.02%

```sql
# Write your MySQL query statement below
select t1.product_id, t1.first_year, t2.quantity, t2.price
from (select product_id, min(year) as first_year from Sales group by product_id) t1
join Sales t2 on (t1.product_id = t2.product_id and t1.first_year = t2.year);
```

### Classes More Than 5 Students

> Beats 97.81%

```sql
# Write your MySQL query statement below
select class from Courses group by class having count(student) >= 5;
```

### Find Followers Count

> Beats 95.20%

```sql
# Write your MySQL query statement below
select user_id, count(*) as followers_count
from Followers
group by user_id
order by user_id;
```

### Biggest Single Number

> Beats 40.82%

```sql
# Write your MySQL query statement below
select max(num) as num from (
    select num from MyNumbers group by num having count(*) = 1
) t;
```

### Customers Who Bought All Products

> Beats 79.89%

```sql
# Write your MySQL query statement below
select customer_id from Customer
group by customer_id
having count(distinct product_key) = (select count(*) from Product);
```

## Advanced Select and Joins

### The Number of Employees Which Report to Each Employee

> Beats 22.25%

```sql
# Write your MySQL query statement below
select reports_to as employee_id, (select name from Employees where employee_id = t.reports_to) as name, count(*) as reports_count, round(avg(age)) as average_age
from Employees t
where reports_to is not null
group by reports_to
order by reports_to;
```

### Primary Department for Each Employee

> Beats 94.66%

```sql
# Write your MySQL query statement below
select * from (
  select employee_id, first_value(department_id) over (PARTITION by employee_id order by primary_flag) as department_id
  from Employee
  ) t
group by employee_id;
```

### Triangle Judgement

> Beats 21.69%

```sql
# Write your MySQL query statement below
select *, (IF(x + y > z and x + z > y and y + z > x, 'Yes', 'No')) as triangle from Triangle;
```

### Consecutive Numbers

> Beats 58.80%

```sql
# Write your MySQL query statement below
select distinct num as ConsecutiveNums from Logs B where exists (select * from Logs A where A.id = B.id - 1 and A.num = B.num) and exists (select * from Logs C where C.id = B.id + 1 and C.num = B.num);
```

### Product Price at a Given Date

> Beats 6.70%

```sql
# Write your MySQL query statement below
select product_id, IFNULL((select new_price from Products where product_id = t.product_id and change_date <= '2019-08-16' order by change_date desc limit 1), 10) as price
from Products t
group by product_id
```

### Last Person to Fit in the Bus

> Beats 5.01%

```sql
# Write your MySQL query statement below
select person_name from (
  select *, sum(weight) over (order by turn) as total_weight from Queue
) t
where total_weight <= 1000
order by total_weight desc
limit 1;
```

### Count Salary Categories

> Beats 84.35%

```sql
# Write your MySQL query statement below
select 'Low Salary' as category, sum(income < 20000) as accounts_count from Accounts
union all
select 'Average Salary' as category, sum(income between 20000 and 50000) as accounts_count from Accounts
union all
select 'High Salary' as category, sum(income > 50000) as accounts_count from Accounts;
```

## Subqueries

### The Number of Employees Which Report to Each Employee

> Beats 95.91%

```sql
# Write your MySQL query statement below
select employee_id
from Employees e
where salary < 30000 and manager_id is not null and not exists (select 1 from Employees where employee_id = e.manager_id)
order by employee_id;
```

### Exchange Seats

> Beats 24.98%

```sql
# Write your MySQL query statement below
select id, IFNULL(IF(id % 2 = 1, (select student from Seat where id = t.id + 1), (select student from Seat where id = t.id - 1)), t.student) as student from Seat t;
```

### Movie Rating

> Beats 62.86%

```sql
# Write your MySQL query statement below
(select name as results
from Users join MovieRating using (user_id)
group by user_id
order by count(*) desc, name
limit 1)
union all
(select title as results
from Movies join MovieRating using (movie_id)
where year(created_at) = 2020 and month(created_at) = 2
group by movie_id
order by avg(rating) desc, title
limit 1);
```
