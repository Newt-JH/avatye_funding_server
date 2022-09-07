drop procedure readUserDIV;

DELIMITER $$
create procedure readUserDIV(IN lloginMethod varchar(50), lloginID varchar(50))
begin
    select userID from loginPath where loginMethod = lloginMethod and loginID = lloginID;
end $$
