drop procedure myProfile;

DELIMITER $$
create procedure myProfile(IN user varchar(50))
begin
    select profileImage,nickName,Date from userProfile
        join user u
            on userProfile.userID = u.userID
    where u.userID = user;
end $$