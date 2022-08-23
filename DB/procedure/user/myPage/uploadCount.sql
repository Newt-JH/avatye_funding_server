drop procedure uploadCount;

DELIMITER $$
create procedure uploadCount(IN user varchar(50))
begin
        select count(*) as count from project where userID = user;
end $$