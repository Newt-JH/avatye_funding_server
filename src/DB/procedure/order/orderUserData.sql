drop procedure orderUserData;

DELIMITER $$
create procedure orderUserData(IN inUserID varchar(50))
begin
    select phone,(select email from user where userID = inUserID) as email from userProfile where userID = inUserID;
end $$