drop procedure myInfor;

DELIMITER $$
create procedure myInfor(IN inputUser varchar(50))
begin
    select userProfile.*,website,email,
        pay.userID,bank,accountNumber,pay.userName as payUserName,userBirth,cardNumber,cardEndDate,cardPassword,`DIV`,
        shipIndex,s.userName,address,s.phone as shipPhone,shippingCheck from userProfile
         left join user u on userProfile.userID = u.userID
         left join payment pay on userProfile.userID = pay.userID
         left join shipping s on userProfile.userID = s.userID
     where userProfile.userID = inputUser;
end $$