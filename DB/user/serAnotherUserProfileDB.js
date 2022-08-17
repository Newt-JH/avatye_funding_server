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

function anotherPage(userID) {
    const query = `select comment from userProfile where userID ="${userID}";`
    return conpro(query);
}

function anotherProfile(userID) {
    const query =
        `select profileImage,nickName,Date 
    from userProfile
        join user u 
            on userProfile.userID = u.userID
    where u.userID = "${userID}";`
    return conpro(query);
}

function anotherUploadProject(userID, myID) {
    const query =
        `select 
            project.projectIndex,profileIMG,name,nickName,longTitle,summary,goalPrice,nowPrice,endDate,userID,hc.heartCheck from
        (select
                p.projectIndex,profileIMG,c.name,uP.nickName,p.longTitle,summary,goalPrice,nowPrice,endDate,uP.userID
                from project p
                    join category c
                        on p.cateIndex = c.cateIndex
                    join user u
                        on u.userID = p.userID
                    join userProfile uP
                        on u.userID = uP.userID
                where u.userID = '${userID}') as project
                left join (select projectIndex,heartCheck from heart where userID = '${myID}') as hc
                on hc.projectIndex = project.projectIndex;;
    `
    return conpro(query);
}

function anotherBuyProject(userID, myID) {
    const query = `
    select project.projectIndex,profileIMG,name,nickName,longTitle,summary,goalPrice,nowPrice,endDate,userID,hc.heartCheck from
        (select  p.projectIndex,profileIMG,c.name,uP.nickName,p.longTitle,summary,goalPrice,nowPrice,endDate,uP.userID
    from \`order\` o
        join project p
            on o.projectIndex = p.projectIndex

        join category c
            on p.cateIndex = c.cateIndex
        join user u
            on p.userID = u.userID
        join userProfile uP
            on u.userID = uP.userID
    where o.userID = '${userID}'
    group by o.projectIndex
    order by endDate desc) as project
        left join (select projectIndex,heartCheck from heart where userID = '${myID}') as hc
            on hc.projectIndex = project.projectIndex;`
    return conpro(query);
}




module.exports = {
    anotherPage,
    anotherUploadProject,
    anotherBuyProject,
    anotherProfile
}