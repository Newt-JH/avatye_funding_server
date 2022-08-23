drop procedure loginEmail;

DELIMITER $$
create procedure loginEmail(IN eemail varchar(50))
begin
    select Password from user where Email = eemail;
end $$