drop procedure addShipping;

DELIMITER $$
create procedure addShipping(IN user varchar(50),name varchar(20),addre varchar(20),pho varchar(20))
begin
        insert into shipping(userID, userName, address, phone) VALUES (user,name,addre,pho);
end $$
DELIMITER;
