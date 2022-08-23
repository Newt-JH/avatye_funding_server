drop procedure createGift;

DELIMITER $$
create procedure createGift(IN ggiftTitle varchar(50), ggiftDetail varchar(50), pprojectId varchar(50),ggiftPrice varchar(50),ggiftCount varchar(50),ggiftStock varchar(50),ggiftDeliveryDate varchar(50))
begin
    insert into
    projectGift(gitfTitle, giftDetail, projectIndex, giftPrice, giftCount, giftStock, giftDeliveryDate)
    value (ggiftTitle, ggiftDetail, pprojectId,ggiftPrice,ggiftCount,ggiftStock,ggiftDeliveryDate);
end $$
