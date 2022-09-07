drop procedure followed;

DELIMITER $$
create procedure followed(IN user varchar(50))
begin
    select followed from follow where following = user and followingCheck = 1;
end $$