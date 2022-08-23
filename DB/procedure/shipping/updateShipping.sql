drop procedure updateShipping;

DELIMITER $$
create procedure updateShipping(IN shipID integer,user varchar(50),name varchar(20),addre varchar(20),pho varchar(20))
begin
        update shipping
        set userID = user,
            userName = name,
            address = addre,
            phone = pho
    where shipIndex = shipID;
end $$