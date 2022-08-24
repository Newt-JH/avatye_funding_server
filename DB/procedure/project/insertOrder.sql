drop procedure if exists insertOrder;

DELIMITER $$
create procedure insertOrder(IN inProject varchar(50),ingift varchar(50),inUserID varchar(50),inpaymentIndex varchar(50),inOrderPrice varchar(50),inShipIndex varchar(50))
begin
    insert into
    `order`(projectIndex, giftIndex, userID, orderDate, paymentIndex, orderPrice, shippingUserName, shippingAdress, shippingPhone)
values (inProject,ingift,inUserID,DATE_ADD(NOW(), INTERVAL 9 HOUR),inpaymentIndex,inOrderPrice,(select userName from shipping where userID = inUserID and shipIndex = inShipIndex),(select address from shipping where userID = inUserID and shipIndex = inShipIndex),(select phone from shipping where userID = inUserID and shipIndex = inShipIndex));
end $$

call insertOrder('1','1','vx51zp9me0','1','30000','1');