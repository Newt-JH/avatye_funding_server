drop procedure readReview;

DELIMITER $$
create procedure readReview(IN inputWhich varchar(50),inputProject varchar(50))
begin
    select review.*,nickName,profileImage
        from review
        join userProfile uP on review.userID = uP.userID
          where reviewDIV = inputWhich and projectIndex = inputProject;
end $$