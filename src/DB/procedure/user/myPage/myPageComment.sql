drop procedure myPageComment;

DELIMITER $$
create procedure myPageComment(IN user varchar(50))
begin
    select comment from userProfile where userID = user;
end $$