const { query } = require('express');
const cons = require('../DatabaseConn');
const db = cons.dataCon;
const moment = require("moment");

const wrap = require('../../util/wrapper');
const wrapper = wrap.wrapper;
// conpro > DB 읽어올때 쓰는 모듈 ( 프로미스 반환 / async await 사용하기 위해 사용 )
// con > row에 대해 읽어올 필요가 없는 쿼리 날릴때 사용
const conpro = cons.conpro;
const con = cons.con;
const tran = cons.tran;

// 내 소개
function myPageComment(userID) {
    const query = `select comment from userProfile where userID ="${userID}";`
    return conpro(query);
}

// 내 프로필 정보 반환
function myProfile(userID) {
    const query =
        `select profileImage,nickName,Date from userProfile
        join user u 
            on userProfile.userID = u.userID
    where u.userID = "${userID}";`
    return conpro(query);
}

// 내가 올린 프로젝트
function myUploadProject(userID) {
    const query =
        `
        select  (p.nowPrice/p.goalPrice * 100) as percent,p.projectIndex,profileIMG,c.name,uP.nickName,uP.userID,p.longTitle,summary,goalPrice,nowPrice,endDate
        ,(select heartCheck from heart where userID = '${userID}' and projectIndex = p.projectIndex) as heartCheck        
        from project p
                    join category c
                        on p.cateIndex = c.cateIndex
                    join user u
                        on u.userID = p.userID
                    join userProfile uP
                        on u.userID = uP.userID
                where u.userID = '${userID}';
    `
    return conpro(query);
}

// 내가 올린 프로젝트 개수
function myUploadCount(userID) {
    const query =
        `select count(*) as count from project where userID = '${userID}';`
    return conpro(query);
}

// 내가 후원한 프로젝트
function myBuyProject(userID) {
    const query = `
    select  (p.nowPrice/p.goalPrice * 100) as percent,p.projectIndex,profileIMG,c.name,uP.nickName,uP.userID,p.longTitle,summary,goalPrice,nowPrice,endDate
    ,(select heartCheck from heart where userID = '${userID}' and projectIndex = p.projectIndex) as heartCheck
    from \`order\` o
        join project p
            on o.projectIndex = p.projectIndex
        join category c
            on p.cateIndex = c.cateIndex
        join user u
            on o.userID = u.userID
        join userProfile uP
            on p.userID = uP.userID
    where o.userID = '${userID}'
    group by o.projectIndex
    order by endDate desc
`
    return conpro(query);
}

// 내가 후원한 프로젝트 개수
function myBuyCount(userID) {
    const query =
        `Select count(*) as count from (select count(*) as count from \`order\` where userID = '${userID}' group by projectIndex) as total;`
    return conpro(query);
}

// 정보 수정 시 반환할 내 정보
function myInfor(userID) {
    const query =
        `select userProfile.*,website,email,
        pay.userID,bank,accountNumber,pay.userName as payUserName,userBirth,cardNumber,cardEndDate,cardPassword,\`DIV\`,
        shipIndex,s.userName,address,s.phone as shipPhone,shippingCheck from userProfile
         left join user u on userProfile.userID = u.userID
         left join payment pay on userProfile.userID = pay.userID
         left join shipping s on userProfile.userID = s.userID
     where userProfile.userID = '${userID}';`
    return conpro(query);
}

module.exports = {
    myPageComment,
    myUploadProject,
    myBuyProject,
    myProfile,
    myUploadCount,
    myBuyCount,
    myInfor
}