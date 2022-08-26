drop procedure detailProject;

DELIMITER $$
create procedure detailProject(IN inputproject varchar(50),inUserID varchar(50))
begin
    select (select count(*) from projectUpdate where projectIndex = inputproject)  as updateCount,
           (select count(*) from review where projectIndex = inputproject)  as reviewCount,
           (select heartCheck from heart where userID = inUserID and projectIndex = inputproject) as heartCheck,lastLogin,
        (project.nowPrice/project.goalPrice * 100) as percent,project.projectIndex,c.cateIndex,c.name as cateName,project.userID,longTitle,summary,profileIMG as titleProfile,goalPrice,beginDate,endDate,nowPrice, longTitle, shortTitle, summary, goalprice, beginDate, endDate, nowPrice, sponsor, (select count(*) from heart where projectIndex = inputproject and heartCheck = 1) as heart, share, contents, video, webAddress, searchTag, giftIndex, giftTitle, giftDetail, giftPrice, giftCount, giftStock, profileImage as userProfile, nickName, Comment, Private, basicAddress, phone
    from project
        left join projectGift pG
            on project.projectIndex = pG.projectIndex
        join userProfile uP
            on project.userID = uP.userID
        join category c on project.cateIndex = c.cateIndex
    where project.projectIndex = inputproject;
end $$