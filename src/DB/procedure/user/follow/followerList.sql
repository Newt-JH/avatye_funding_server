drop procedure followerList;

DELIMITER $$
create procedure followerList(IN user varchar(50))
begin
    select following from follow where followed = user and followingCheck = 1;
end $$