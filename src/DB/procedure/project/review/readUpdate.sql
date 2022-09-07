drop procedure readUpdate;

DELIMITER $$
create procedure readUpdate(IN inputProject varchar(50))
begin
                select updateIndex, projectIndex, projectUpdate.comment, uploadDate,nickName,profileImage
        from projectUpdate
        join userProfile uP on projectUpdate.userID = uP.userID
          where projectIndex = inputProject;
end $$


