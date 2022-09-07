drop procedure heartList;

DELIMITER $$
create procedure heartList(IN inputUser varchar(50))
begin
    select
        (p.nowPrice/p.goalPrice * 100) as percent,
        p.projectIndex,
        profileIMG,
        c.name,
        uP.nickName,
        longTitle,
        summary,
        goalPrice,
        nowPrice,
        beginDate,
        endDate,
        heartCheck,
        IF((p.beginDate <= date_format(now(), '%Y-%m-%d') and
            p.endDate > date_format(now(), '%Y-%m-%d')), 'ing', 'end') as progress
 from heart h
          join project p
               on h.projectIndex = p.projectIndex
          join userProfile uP
               on p.userID = uP.userID
          join category c
               on p.cateIndex = c.cateIndex
 where date_format(now(), '%Y-%m-%d') >= p.beginDate
   and h.userID = inputUser
   and heartCheck = 1;
end $$
