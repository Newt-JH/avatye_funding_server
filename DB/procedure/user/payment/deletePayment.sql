drop procedure deletePayment;

DELIMITER $$
create procedure deletePayment(IN payID integer,user varchar(50))
begin
        update payment
        set paymentCheck = 0
    where paymentIndex = payID and userID = user;
end $$