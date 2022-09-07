drop procedure checkPassword;

DELIMITER $$
create procedure checkPassword(IN inUser varchar(50))
begin
    select password from user where userID = inUser;
end $$