drop procedure anotherBuyProject;

DELIMITER $$
create procedure anotherBuyProject(IN user varchar(50),my varchar(50))
begin
    select  (p.nowPrice/p.goalPrice * 100) as percent,p.projectIndex,profileIMG,c.name,uP.nickName,p.longTitle,summary,goalPrice,nowPrice,endDate,uP.userID
,(select heartCheck from heart where userID = my and projectIndex = p.projectIndex) as heartCheck
from `order` o
        join project p
            on o.projectIndex = p.projectIndex

        join category c
            on p.cateIndex = c.cateIndex
        join user u
            on p.userID = u.userID
        join userProfile uP
            on u.userID = uP.userID
    where o.userID = user
    group by o.projectIndex
    order by endDate desc;
end $$