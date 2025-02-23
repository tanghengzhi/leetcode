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
