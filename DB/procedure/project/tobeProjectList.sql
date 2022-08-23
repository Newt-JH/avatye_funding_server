drop procedure tobeProjectList;

DELIMITER $$
create procedure tobeProjectList()
begin
    select projectIndex, longTitle,summary,
        profileIMG, nickName,c.name,uP.userID
        from project p
            join category c
                on p.cateIndex = c.cateIndex
            join userProfile uP
                on p.userID = uP.userID
        where beginDate > DATE_ADD(NOW(),INTERVAL 9 HOUR)
        order by beginDate;
end $$