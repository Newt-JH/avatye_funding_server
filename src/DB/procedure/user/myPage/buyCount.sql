drop procedure buyCount;

DELIMITER $$
create procedure buyCount(IN user varchar(50))
begin
        Select count(*) as count from (select count(*) as count from `order` where userID = user group by projectIndex) as total;
end $$







select  count(distinct projectIndex) as count from `order` where userID = '4erp0nhd1y6';