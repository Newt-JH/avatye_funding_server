drop procedure loginNickname;

DELIMITER $$
create procedure loginNickname(IN inUserID varchar(50))
begin
    select nickName from userProfile where userID = inUserID;
end $$