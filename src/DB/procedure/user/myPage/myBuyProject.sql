drop procedure myBuyProject;

DELIMITER $$
create procedure myBuyProject(IN inputUser varchar(50))
begin
    select  (p.nowPrice/p.goalPrice * 100) as percent,p.projectIndex,profileIMG,c.name,uP.nickName,uP.userID,p.longTitle,summary,goalPrice,nowPrice,endDate
    ,(select heartCheck from heart where userID = inputUser and projectIndex = p.projectIndex) as heartCheck
    from `order` o
        join project p
            on o.projectIndex = p.projectIndex
        join category c
            on p.cateIndex = c.cateIndex
        join user u
            on o.userID = u.userID
        join userProfile uP
            on p.userID = uP.userID
    where o.userID = inputUser
    group by o.projectIndex
    order by endDate desc;
end $$