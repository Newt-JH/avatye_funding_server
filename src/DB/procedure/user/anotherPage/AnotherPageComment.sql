drop procedure AnotherPageComment;

DELIMITER $$
create procedure AnotherPageComment(IN user varchar(50))
begin
        select comment from userProfile where userID = user;
end $$