drop procedure orderPaymentData;

DELIMITER $$
create procedure orderPaymentData(IN inUserID varchar(50))
begin
    select * from payment where userID = 'vx51zp9me0' and paymentCheck = 1;
end $$