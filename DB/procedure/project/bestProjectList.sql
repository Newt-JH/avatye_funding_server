drop procedure bestProjectList;

DELIMITER $$
create procedure bestProjectList(IN inUserID varchar(50))
begin
    select (p.nowPrice/p.goalPrice * 100) as percent,p.projectIndex, longTitle,summary,
        profileIMG, goalPrice,nowPrice,endDate,nickName,c.name,uP.userID,(select heartCheck from heart where userID = inUserID and projectIndex = p.projectIndex) as heartCheck
        from project p
            join category c
                on p.cateIndex = c.cateIndex
            join userProfile uP
                on p.userID = uP.userID
        where (p.nowPrice/p.goalPrice * 100) >= 100 and endDate > DATE_ADD(NOW(), INTERVAL 9 HOUR)
        order by percent desc;
end $$