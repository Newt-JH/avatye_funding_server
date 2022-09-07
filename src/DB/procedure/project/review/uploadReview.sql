drop procedure uploadReview;

DELIMITER $$
create procedure uploadReview(IN inputProject varchar(50),inputUser varchar(50),inputComment varchar(50),inputWhich varchar(50))
begin
    insert
        into review(projectIndex, userID, comment, reviewDiv,uploadDate)
        VALUES (inputProject,inputUser,inputComment,inputWhich,DATE_ADD(NOW(), INTERVAL 9 HOUR));
end $$