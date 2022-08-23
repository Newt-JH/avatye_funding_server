drop procedure readProject;

DELIMITER $$
create procedure readProject(IN inUserID varchar(50))
begin
    select (p.nowPrice/p.goalPrice * 100) as percent,p.projectIndex, longTitle,summary,
        profileIMG, goalPrice,nowPrice,endDate,nickName,c.name,uP.userID,(select heartCheck from heart where userID = inUserID and projectIndex = p.projectIndex) as heartCheck,
        IF((p.beginDate <= date_format(now(), '%Y-%m-%d') and
                p.endDate > date_format(now(), '%Y-%m-%d')), 'ing', 'end') as progress
        from project p
            join category c
                on p.cateIndex = c.cateIndex
            join userProfile uP
                on p.userID = uP.userID;
end $$