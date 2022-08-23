drop procedure deadlineProjectList;

DELIMITER $$
create procedure deadlineProjectList(IN inUserID varchar(50))
begin
    select (p.nowPrice/p.goalPrice * 100) as percent,p.projectIndex, longTitle,summary,
        profileIMG, goalPrice,nowPrice,endDate,nickName,c.name,uP.userID,(select heartCheck from heart where userID = inUserID and projectIndex = p.projectIndex) as heartCheck
        from project p
            join category c
                on p.cateIndex = c.cateIndex
            join userProfile uP
                on p.userID = uP.userID
        where date_sub(p.endDate,INTERVAL 7 DAY) < DATE_ADD(NOW(),INTERVAL 9 HOUR)
        and p.endDate > DATE_ADD(NOW(),INTERVAL 9 HOUR)
        order by endDate;
end $$