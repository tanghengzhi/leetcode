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
