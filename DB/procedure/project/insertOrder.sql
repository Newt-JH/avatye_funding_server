drop procedure if exists insertOrder;

DELIMITER $$
create procedure insertOrder(IN inProject varchar(50),ingift varchar(50),inUserID varchar(50),inpaymentIndex varchar(50),inOrderPrice varchar(50),inShipIndex varchar(50))
begin
    declare giftCountBoolean int;
    set giftCountBoolean = (select giftCount from projectGift where giftIndex = ingift);
    if(giftCountBoolean) >= 1 then
    insert into
    `order`(projectIndex, giftIndex, userID, orderDate, paymentIndex, orderPrice, shippingUserName, shippingAdress, shippingPhone)
values (inProject,ingift,inUserID,DATE_ADD(NOW(), INTERVAL 9 HOUR),inpaymentIndex,inOrderPrice,(select userName from shipping where userID = inUserID and shipIndex = inShipIndex),(select address from shipping where userID = inUserID and shipIndex = inShipIndex),(select phone from shipping where userID = inUserID and shipIndex = inShipIndex));
    update project set sponsor = (select sponsor from (select sponsor from project where project.projectIndex = inProject) as h) + 1 where projectIndex = inProject;
    update projectGift set giftStock = (select giftStock from (select giftStock from projectGift where giftIndex = ingift) as h) + 1, giftCount = (select giftCount from (select giftCount from projectGift where giftIndex = ingift) as hh) - 1 where giftIndex = ingift;
    select 'succsess' as result;
    else
        select 'fail' as result;
        end if;
    end $$

call insertOrder('1','1','vx51zp9me0','1','30000','1');