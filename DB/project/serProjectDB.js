const cons = require('../DatabaseConn');
// pro > DB 읽어올때 쓰는 모듈 ( 프로미스 반환 / async await 사용하기 위해 사용 )
// tto > row에 대해 읽어올 필요가 없는 쿼리 날릴때 사용
const conpro = cons.conpro;
const con = cons.con;
const trans = cons.tran;

// 전체 프로젝트 불러오기
function readProject(userID) {
    const query =
        `select (p.nowPrice/p.goalPrice * 100) as percent,p.projectIndex, longTitle,summary,
    profileIMG, goalPrice,nowPrice,endDate,nickName,c.name,uP.userID,hc.heartCheck
    from project p
    left join (select projectIndex,heartCheck from heart where userID = '${userID}') as hc
                on hc.projectIndex = p.projectIndex
        join category c
            on p.cateIndex = c.cateIndex
        join userProfile uP
            on p.userID = uP.userID;`

    return conpro(query);
}

// 프로젝트 등록하기
function createProject(categoryindex, userDIV, longTitle, shortTitle, summary, imgUrl, searchTag) {

    console.log(categoryindex, userDIV, longTitle, shortTitle, summary, imgUrl, searchTag);
    const query = `call createProject ('${categoryindex}','${userDIV}','${longTitle}','${shortTitle}','${summary}','${imgUrl}','${searchTag}')`
    return conpro(query);
}

// cateIndex 찾기
function findCateIndex(category, detailcategory) {
    const query = `select cateIndex from category where name = '${category}' and detailName = '${detailcategory}';`
    return conpro(query);
}



// 인기 프로젝트 순서로 불러오기
function bestProjectList(userID) {
    const query =
        `select percent,project.projectIndex,longTitle,summary,profileIMG,goalPrice,nowPrice,endDate,nickName,name,userID,hc.heartCheck from
        (select (p.nowPrice/p.goalPrice * 100) as percent,p.projectIndex, longTitle,summary,
   profileIMG, goalPrice,nowPrice,endDate,nickName,c.name,uP.userID
   from project p
       join category c
           on p.cateIndex = c.cateIndex
       join userProfile uP
           on p.userID = uP.userID
   where (p.nowPrice/p.goalPrice * 100) >= 100 and endDate > DATE_ADD(NOW(), INTERVAL 9 HOUR)
   order by percent desc) as project
   left join (select projectIndex,heartCheck from heart where userID = '${userID}') as hc
               on hc.projectIndex = project.projectIndex;`
    return conpro(query);
}

// 신규 프로젝트
// 시작 날짜가 1주일 이내인 상품 노출
function newprojectlist(userID) {
    const query =
        `select (project.nowPrice/project.goalPrice * 100) as percent,project.projectIndex, longTitle,summary,
        profileIMG, goalPrice,nowPrice,endDate,nickName,name,userID,hc.heartCheck
    from (select (p.nowPrice/p.goalPrice * 100) as percent,p.projectIndex, longTitle,summary,
        profileIMG, goalPrice,nowPrice,endDate,nickName,c.name,uP.userID
        from project p
            join category c
                on p.cateIndex = c.cateIndex
            join userProfile uP
                on p.userID = uP.userID
        where p.beginDate > DATE_ADD((DATE_SUB(NOW(), INTERVAL 7 DAY)),INTERVAL 9 HOUR)
        and p.beginDate < DATE_ADD(NOW(),INTERVAL 9 HOUR)
        order by beginDate) as project
            left join (select projectIndex,heartCheck from heart where userID = '${userID}') as hc
                on hc.projectIndex = project.projectIndex;`
    return conpro(query);
}

// 마감 임박 프로젝트
// 마감 날짜가 1주일 이내인 상품 노출
function deadlineprojectlist(userID) {
    const query =
        `select percent,project.projectIndex, longTitle,summary,
        profileIMG, goalPrice,nowPrice,endDate,nickName,name,userID,hc.heartCheck from
             (select (p.nowPrice/p.goalPrice * 100) as percent,p.projectIndex, longTitle,summary,
        profileIMG, goalPrice,nowPrice,endDate,nickName,c.name,uP.userID
        from project p
            join category c
                on p.cateIndex = c.cateIndex
            join userProfile uP
                on p.userID = uP.userID
        where date_sub(p.endDate,INTERVAL 7 DAY) < DATE_ADD(NOW(),INTERVAL 9 HOUR)
        and p.endDate > DATE_ADD(NOW(),INTERVAL 9 HOUR)
        order by endDate) as project
            left join (select projectIndex,heartCheck from heart where userID = '${userID}') as hc
                    on hc.projectIndex = project.projectIndex;
`
    return conpro(query);
}

// 공개 예정 프로젝트
function tobeprojectlist() {
    const query =
        `select projectIndex, longTitle,summary,
        profileIMG, nickName,c.name,uP.userID
        from project p
            join category c
                on p.cateIndex = c.cateIndex
            join userProfile uP
                on p.userID = uP.userID
        where beginDate > DATE_ADD(NOW(),INTERVAL 9 HOUR)
        order by beginDate;`
    return conpro(query);
}

// 제목, 내용 검색
function searchTitleSummary(keyword,userID) {
    const query =
        `select project.*,hc.heartCheck from (select
            (nowPrice / p.goalPrice * 100) as percent,p.*,c.name,uP.nickName,
            IF((p.beginDate <= date_format(now(), '%Y-%m-%d') and
                    p.endDate > date_format(now(), '%Y-%m-%d')), 'ing', 'end') as progress

            from project p
            join category c on p.cateIndex = c.cateIndex
            join userProfile uP on p.userID = uP.userID

            where longTitle like '%${keyword}%' or summary like '%${keyword}%') as project
            left join (select projectIndex,heartCheck from heart where userID = '${userID}') as hc
                    on hc.projectIndex = project.projectIndex;`;
    return conpro(query);
}

// 키워드 검색
function searchKeyword(keyword,userID) {
    const query =
        `select project.*,heartCheck from (select
            (nowPrice / p.goalPrice * 100) as percent,p.*,c.name,uP.nickName,
            IF((p.beginDate <= date_format(now(), '%Y-%m-%d') and
                    p.endDate > date_format(now(), '%Y-%m-%d')), 'ing', 'end') as progress
            from project p
            join category c on p.cateIndex = c.cateIndex
            join userProfile uP on p.userID = uP.userID
        where searchTag like '%${keyword}%') as project
            left join (select projectIndex,heartCheck from heart where userID = '${userID}') as hc
                on hc.projectIndex = project.projectIndex;`
    return conpro(query);
}

module.exports = {
    readProject,
    createProject,
    bestProjectList,
    newprojectlist,
    deadlineprojectlist,
    tobeprojectlist,
    findCateIndex,
    searchTitleSummary,
    searchKeyword
} 