drop procedure searchTitleSummary;

DELIMITER $$
create procedure searchTitleSummary(IN inKeyword varchar(50),inUserID varchar(50))
begin
    select
        (nowPrice / p.goalPrice * 100) as percent,p.*,c.name,uP.nickName,
        IF((p.beginDate <= date_format(now(), '%Y-%m-%d') and
                p.endDate > date_format(now(), '%Y-%m-%d')), 'ing', 'end') as progress,
(select heartCheck from heart where userID = inUserID and projectIndex = p.projectIndex) as heartCheck

        from project p
        join category c on p.cateIndex = c.cateIndex
        join userProfile uP on p.userID = uP.userID

        where longTitle like CONCAT('%',inKeyword,'%') or summary like CONCAT('%',inKeyword,'%');
end $$