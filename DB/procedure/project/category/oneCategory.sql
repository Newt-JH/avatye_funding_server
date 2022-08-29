drop procedure oneCategory;

DELIMITER $$
create procedure oneCategory(IN inputUser varchar(50),inputCate varchar(50))
begin
    select IF((p.beginDate <= date_format(now(), '%Y-%m-%d') and
                p.endDate > date_format(now(), '%Y-%m-%d')), 'ing', if((p.beginDate > date_format(now(), '%Y-%m-%d')),'begin','end')) as progress,
        (p.nowPrice/p.goalPrice * 100) as percent,p.projectIndex, longTitle,summary,
    profileIMG, goalPrice,nowPrice,endDate,nickName,c.name,uP.userID,(select heartCheck from heart where userID = inputUser and projectIndex = p.projectIndex) as heartCheck
    from project p
        join category c
            on p.cateIndex = c.cateIndex
        join userProfile uP
            on p.userID = uP.userID
    where c.name = inputCate;
end $$