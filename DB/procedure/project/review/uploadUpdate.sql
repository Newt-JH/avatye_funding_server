drop procedure uploadUpdate;

DELIMITER $$
create procedure uploadUpdate(IN inputProject varchar(50),inputUser varchar(50),inputComment text)
begin
    insert
        into projectUpdate(projectIndex, userID, comment,uploadDate)
        VALUES (inputProject,inputUser,inputComment,DATE_ADD(NOW(), INTERVAL 9 HOUR));
end $$