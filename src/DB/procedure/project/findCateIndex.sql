drop procedure findCateIndex;

DELIMITER $$
create procedure findCateIndex(IN incategory varchar(50),detailCategory varchar(50))
begin
    select cateIndex from category where name = incategory and detailName = detailCategory;
end $$