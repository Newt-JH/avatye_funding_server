drop procedure createProject;

DELIMITER $$
create procedure createProject(IN categoryindex varchar(200),userDIV varchar(20),longTi varchar(30),shortTi varchar(20),susummary varchar(100),imgUrl varchar(200),serch varchar(30), content text, startData varchar(100), theEndDate varchar(100), ggoalprice Integer)
begin
        insert into
    project(cateIndex,userID,longTitle,shortTitle,summary,profileIMG,searchTag, contents, beginDate, endDate, goalPrice)
    values (categoryindex,userDIV,longTi, shortTi, susummary, imgUrl, serch, content, startData, theEndDate, ggoalPrice);
        select last_insert_id() as proIndex;
end $$
DELIMITER;