drop procedure mdProject;

DELIMITER $$
create procedure mdProject(IN inputUser varchar(50))
begin
    select (project.nowPrice/project.goalPrice * 100) as percent,
        project.projectIndex,longTitle,profileIMG,goalPrice,nowPrice,nickName,c.name,uP.userID,(select heartCheck from heart where userID = inputUser and projectIndex = project.projectIndex) as heartCheck
        from project
            join userProfile uP
                on project.userID = uP.userID
            join category c
                on project.cateIndex = c.cateIndex
        where endDate > date_format(now(), '%Y-%m-%d') and beginDate < date_format(now(), '%Y-%m-%d')
        order by goalprice desc
        limit 8;
end $$