drop procedure myUploadProject;

DELIMITER $$
create procedure myUploadProject(IN inputUser varchar(50))
begin
    select  (p.nowPrice/p.goalPrice * 100) as percent,p.projectIndex,profileIMG,c.name,uP.nickName,uP.userID,p.longTitle,summary,goalPrice,nowPrice,endDate
        ,(select heartCheck from heart where userID = inputUser and projectIndex = p.projectIndex) as heartCheck
        from project p
                    join category c
                        on p.cateIndex = c.cateIndex
                    join user u
                        on u.userID = p.userID
                    join userProfile uP
                        on u.userID = uP.userID
                where u.userID = inputUser;
end $$