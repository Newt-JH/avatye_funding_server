const cons = require('../DatabaseConn');
// pro > DB 읽어올때 쓰는 모듈 ( 프로미스 반환 / async await 사용하기 위해 사용 )
// tto > row에 대해 읽어올 필요가 없는 쿼리 날릴때 사용
const conpro = cons.conpro;
const con = cons.con;
const trans = cons.tran;

// 전체 카테고리 불러오기
function readCategory(userID) {
    const query =
        `select percent,project.projectIndex,longTitle,summary,profileIMG,goalPrice,nowPrice,endDate,nickName,name,userID,hc.heartCheck from
        (select (p.nowPrice/p.goalPrice * 100) as percent,p.projectIndex, longTitle,summary,
   profileIMG, goalPrice,nowPrice,endDate,nickName,c.name,uP.userID
   from project p
       join category c
           on p.cateIndex = c.cateIndex
       join userProfile uP
           on p.userID = uP.userID
   order by percent desc) as project
   left join (select projectIndex,heartCheck from heart where userID = '${userID}') as hc
               on hc.projectIndex = project.projectIndex;`

    return conpro(query);
}

// 카테고리별 상품 불러오기
function oneCategory(cateName, userID) {
    const query = `
    select percent,project.projectIndex,longTitle,summary,profileIMG,goalPrice,nowPrice,endDate,nickName,name,userID,hc.heartCheck from
        (select (p.nowPrice/p.goalPrice * 100) as percent,p.projectIndex, longTitle,summary,
   profileIMG, goalPrice,nowPrice,endDate,nickName,c.name,uP.userID
   from project p
       join category c
           on p.cateIndex = c.cateIndex
       join userProfile uP
           on p.userID = uP.userID
   where c.name = '${cateName}'
   order by percent desc) as project
   left join (select projectIndex,heartCheck from heart where userID = '${userID}') as hc
               on hc.projectIndex = project.projectIndex;`

    return conpro(query);
}

// 전체 카테고리 불러오기
function readAll() {
    const query =
        `select name,group_concat(detailName) as catename from category group by name;`

    return conpro(query);
}



module.exports = {
    readCategory,
    oneCategory,
    readAll
} 