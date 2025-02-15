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
