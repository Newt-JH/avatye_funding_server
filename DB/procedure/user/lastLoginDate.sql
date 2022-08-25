drop procedure lastLoginDate;

DELIMITER $$
create procedure lastLoginDate(IN inputproject varchar(50))
begin
    update userProfile set lastLogin = DATE_ADD(NOW(), INTERVAL 9 HOUR) where userID = inputproject;
end $$