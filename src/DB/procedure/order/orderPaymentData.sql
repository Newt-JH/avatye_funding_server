drop procedure orderPaymentData;

DELIMITER $$
create procedure orderPaymentData(IN inUserID varchar(50))
begin
    select * from payment where userID = inUserID and paymentCheck = 1;
end $$