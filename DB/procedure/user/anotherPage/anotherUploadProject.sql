drop procedure anotherUploadProject;

DELIMITER $$
create procedure anotherUploadProject(IN user varchar(50),my varchar(50))
begin
    select
        (p.nowPrice/p.goalPrice * 100) as percent,p.projectIndex,profileIMG,c.name,uP.nickName,p.longTitle,summary,goalPrice,nowPrice,endDate,uP.userID,
        (select heartCheck from heart where userID = my and projectIndex = p.projectIndex) as heartCheck
            from project p
                join category c
                    on p.cateIndex = c.cateIndex
                join user u
                    on u.userID = p.userID
                join userProfile uP
                    on u.userID = uP.userID
            where u.userID = use