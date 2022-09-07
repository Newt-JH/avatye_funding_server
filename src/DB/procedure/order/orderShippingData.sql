drop procedure orderShippingData;

DELIMITER $$
create procedure orderShippingData(IN inUserID varchar(50))
begin
    select * from shipping where userID = inUserID and shippingCheck = 1;
end $$