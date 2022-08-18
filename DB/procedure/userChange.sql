drop procedure userNickChange;

DELIMITER $$
create procedure userNickChange(IN which varchar(50),ID varchar(20))
begin
        update userProfile set userProfile.nickName = which where userProfile.userID = ID;
end $$
DELIMITER;


drop procedure userProfileImageChange;

DELIMITER $$
create procedure userProfileImageChange(IN which varchar(50),ID varchar(20))
begin
        update userProfile set userProfile.profileImage = which where userProfile.userID = ID;
end $$
DELIMITER;

drop procedure userCommentChange;

DELIMITER $$
create procedure userCommentChange(IN which varchar(50),ID varchar(20))
begin
        update userProfile set userProfile.comment = which where userProfile.userID = ID;
end $$
DELIMITER;

drop procedure userPrivateChange;

DELIMITER $$
create procedure userPrivateChange(IN which boolean,ID varchar(20))
begin
        update userProfile set userProfile.private = which where userProfile.userID = ID;
end $$
DELIMITER;

drop procedure userPhoneChange;

DELIMITER $$
create procedure userPhoneChange(IN which varchar(20),ID varchar(20))
begin
        update userProfile set userProfile.phone = which where userProfile.userID = ID;
end $$
DELIMITER;

drop procedure userEmailChange;

DELIMITER $$
create procedure userEmailChange(IN which varchar(50),ID varchar(20))
begin
        update user set user.email = which where user.userID = ID;
end $$
DELIMITER;

drop procedure userPasswordChange;

DELIMITER $$
create procedure userPasswordChange(IN which varchar(200),ID varchar(20))
begin
        update user set user.password = which where user.userID = ID;
end $$
DELIMITER;