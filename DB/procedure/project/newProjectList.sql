drop procedure newProjectList;

DELIMITER $$
create procedure newProjectList(IN inUserID varchar(50))
begin
    select (p.nowPrice/p.goalPrice * 100) as percent,p.projectIndex, longTitle,summary,
        profileIMG, goalPrice,nowPrice,endDate,nickName,c.name,uP.userID,(select heartCheck from heart where userID = inUserID and projectIndex = p.projectIndex) as heartCheck
        from project p
            join category c
                on p.cateIndex = c.cateIndex
            join userProfile uP
                on p.userID = uP.userID
        where p.beginDate > DATE_ADD((DATE_SUB(NOW(), INTERVAL 7 DAY)),INTERVAL 9 HOUR)
        and p.beginDate < DATE_ADD(NOW(),INTERVAL 9 HOUR)
        order by beginDate;
end $$
