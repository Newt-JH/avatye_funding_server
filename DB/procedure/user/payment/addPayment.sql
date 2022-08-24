drop procedure addPayment;

DELIMITER $$
create procedure addPayment(IN user varchar(50),ban varchar(20),aconum varchar(30),usname varchar(20),userBir varchar(30),carnum varchar(30),carED varchar(30),carPass varchar(30),di varchar(30))
begin

        declare inuser varchar(200);
        declare inbank varchar(30);
        declare inaccountNumber varchar(100);
        declare inuserName varchar(10);
        declare inUserBirth varchar(30);
        declare incardNum varchar(200);
        declare incartEndDate varchar(200);
        declare inCardPass varchar(200);
        declare indiv varchar(200);

        set inuser = if(user = 'null',null,user);
        set inbank = if(ban = 'null',null,ban);
        set inaccountNumber = if(aconum = 'null',null,aconum);
        set inuserName = if(usname = 'null',null,usname);
        set inUserBirth = if(userBir = 'null',null,userBir);
        set incardNum = if(carnum = 'null',null,carnum);
        set incartEndDate = if(carED = 'null',null,carED);
        set inCardPass = if(carPass = 'null',null,carPass);
        set indiv = if(di = 'null',null,di);

        insert into payment(userID, bank, accountNumber, userName,userBirth,cardNumber,cardEndDate,cardPassword,`DIV`)
        VALUES (inuser,inbank,inaccountNumber,inuserName,inUserBirth,incardNum,incartEndDate,inCardPass,indiv);
end $$
DELIMITER;


select * from payment

call addPayment(유저아이디,은행명,게좌번호,유저이름,유저생일,카드번호,카드유효,카드비번,카드은행 구분)