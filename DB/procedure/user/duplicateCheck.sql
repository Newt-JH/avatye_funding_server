drop procedure duplicateCheck;

DELIMITER $$
create procedure duplicateCheck(IN inloginMethod varchar(50),inloginID varchar(50))
begin
    select * from loginPath where loginMethod = inloginMethod and loginID = inloginID;
end $$