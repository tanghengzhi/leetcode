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
