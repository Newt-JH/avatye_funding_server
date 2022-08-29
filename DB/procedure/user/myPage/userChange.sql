drop procedure userChange;

DELIMITER $$
create procedure userChange(IN ID varchar(30),inprofileImage varchar(200),innickName varchar(30),incomment varchar(100),inprivate varchar(10),inphone varchar(30),inpass varchar(200))
begin
        declare proIMG varchar(200);
        declare nick varchar(30);
        declare comments varchar(100);
        declare pri varchar(10);
        declare pho varchar(30);
        declare pass varchar(200);

            set proIMG = if(inprofileImage = 'null',(select profileImage from userProfile where userID = ID),inprofileImage);
            set nick = if(innickName = 'null',(select nickName from userProfile where userID = ID),innickName);
            set comments = if(incomment = 'null',(select userProfile.comment from userProfile where userID = ID),incomment);
            set pri = if(inprivate = 'null',(select private from userProfile where userID = ID),inprivate);
            set pho = if(inphone = 'null',(select phone from userProfile where userID = ID),inphone);
            set pass = if(inpass = 'null',(select user.password from user where userID = ID),inpass);

        update userProfile set userProfile.profileImage = if(inprofileImage = 'null',(select profileImage from userProfile where userID = ID),inprofileImage),
                               userProfile.nickName = nick,
                               userProfile.comment = comments,
                               userProfile.private = pri,
                               userProfile.phone = pho
                           where userProfile.userID = ID;
        update user set user.password = pass where userID = ID;
end $$
DELIMITER;


















drop procedure userChange;

DELIMITER $$
create procedure userChange(IN ID varchar(30),inprofileImage varchar(200),innickName varchar(30),incomment varchar(100),inprivate varchar(10),inphone varchar(30),inpass varchar(200))
begin
        declare proIMG varchar(200);
        declare nick varchar(30);
        declare comments varchar(100);
        declare pri varchar(10);
        declare pho varchar(30);
        declare pass varchar(200);

            set proIMG = if(inprofileImage = 'null',(select profileImage from userProfile where userID = ID),inprofileImage);
            set nick = if(innickName = 'null',(select nickName from userProfile where userID = ID),innickName);
            set comments = if(incomment = 'null',(select userProfile.comment from userProfile where userID = ID),incomment);
            set pri = if(inprivate = 'null',(select private from userProfile where userID = ID),inprivate);
            set pho = if(inphone = 'null',(select phone from userProfile where userID = ID),inphone);
            set pass = if(inpass = 'null',(select user.password from user where userID = ID),inpass);

        update userProfile set userProfile.profileImage = if(inprofileImage = 'null',userProfile.profileImage,inprofileImage),
                               userProfile.nickName = nick,
                               userProfile.comment = comments,
                               userProfile.private = pri,
                               userProfile.phone = pho
                           where userProfile.userID = ID;
        update user set user.password = pass where userID = ID;
end $$
DELIMITER;

select ifnull()