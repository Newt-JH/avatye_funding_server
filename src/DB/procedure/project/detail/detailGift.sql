drop procedure detailGift;

DELIMITER $$
create procedure detailGift(IN inputproject varchar(50))
begin
    select * from projectGift where projectIndex = inputproject;
end $$