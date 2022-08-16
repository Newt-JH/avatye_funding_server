drop procedure heart;

DELIMITER $$
create procedure heart(IN user varchar(50),project varchar(20))
begin
        declare heartBoolean int;
        declare heartChange int;
        set heartBoolean = (select heartCheck from heart where userID = user and projectIndex = project);
        if(heartBoolean) = 1 then
            set heartChange = 0;
        else
            set heartChange = 1;
        end if;
    insert into heart (userID, projectIndex) values (user,project) on duplicate key update heartCheck = heartChange;
    select heartChange as result;
end $$
DELIMITER;