drop procedure bestProject;

DELIMITER $$
create procedure bestProject()
begin
    select (p.nowPrice/p.goalPrice * 100) as percent,projectIndex, longTitle,
    profileIMG, goalPrice,endDate,nickName,c.name,uP.userID, DATE_ADD(NOW(), INTERVAL 9 HOUR) as now
    from project p
        join category c
            on p.cateIndex = c.cateIndex
        join userProfile uP
            on p.userID = uP.userID
    where endDate > now()
    order by percent desc
        limit 8;
end $$