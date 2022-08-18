drop procedure createProject;

DELIMITER $$
create procedure createProject(IN categoryindex varchar(200),userDIV varchar(20),longTi varchar(30),shortTi varchar(20),susummary varchar(100),imgUrl varchar(50),serch varchar(30))
begin
        insert into
    project(cateIndex,userID,longTitle,shortTitle,summary,profileIMG,searchTag)
    values (categoryindex,userDIV,longTi, shortTi, susummary, imgUrl, serch);
        select last_insert_id() as proIndex;
end $$
DELIMITER;