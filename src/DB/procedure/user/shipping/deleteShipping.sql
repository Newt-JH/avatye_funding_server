drop procedure deleteShipping;

DELIMITER $$
create procedure deleteShipping(IN shipID integer,user varchar(50))
begin
        update shipping
        set shippingCheck = 0
    where shipIndex = shipID and userID = user;
end $$