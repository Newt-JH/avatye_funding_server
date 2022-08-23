drop procedure readUser;

DELIMITER $$
create procedure readUser()
begin
    select * from user;
end $$