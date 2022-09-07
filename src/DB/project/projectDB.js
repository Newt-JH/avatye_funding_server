
const moment = require('moment');
const cons = require('../DatabaseConn');
// pro > DB 읽어올때 쓰는 모듈 ( 프로미스 반환 / async await 사용하기 위해 사용 )
// tto > row에 대해 읽어올 필요가 없는 쿼리 날릴때 사용
const conpro = cons.conpro;
const con = cons.con;
const trans = cons.tran;

// 전체 프로젝트 불러오기
function readProject(userID) {
    const query = `call readProject('${userID}')`

    return conpro(query);
}

// 프로젝트 등록하기
function createProject(categoryindex, userDIV, longTitle, shortTitle, summary, imgUrl, searchTag, contents, startDate, endDate, goalprice) {
    const beginDate = moment(startDate).format('YYYY-MM-DD');
    const theEndDate = moment(endDate).format('YYYY-MM-DD');
    console.log(categoryindex, userDIV, longTitle, shortTitle, summary, imgUrl, searchTag, contents, beginDate, theEndDate, goalprice);
    
    const query = `
    insert into
    project(cateIndex,userID,longTitle,shortTitle,summary,profileIMG,searchTag, contents, beginDate, endDate, goalPrice)
    values ('${categoryindex}','${userDIV}','${longTitle}','${shortTitle}','${summary}','${imgUrl}','${searchTag}', '${contents}' ,'${beginDate}', '${theEndDate}', '${goalprice}');`
    return conpro(query);
}

// cateIndex 찾기
function findCateIndex(category, detailcategory) {
    const query = `call findCateIndex('${category}','${detailcategory}');`
    return conpro(query);
}

// 선물 등록
function createGift(giftCount, giftDeliveryDate, giftDetail, giftPrice, giftStock, giftTitle, projectId) {
    const giftDate = moment(giftDeliveryDate).format('YYYY-MM-DD');

    const query = `call createGift('${giftTitle}', '${giftDetail}', '${projectId}','${giftPrice}',' ${giftCount}','${giftStock}','${giftDate}')`

    return con(query);
}



// 인기 프로젝트 순서로 불러오기
function bestProjectList(userID) {
    const query = `call bestProjectList('${userID}');`;
    return conpro(query);
}

// 신규 프로젝트
// 시작 날짜가 1주일 이내인 상품 노출
function newProjectList(userID) {
    const query = `call newprojectlist('${userID}');`
    return conpro(query);
}

// 마감 임박 프로젝트
// 마감 날짜가 1주일 이내인 상품 노출
function deadlineProjectList(userID) {
    const query = `call deadlineProjectList('${userID}');`
    return conpro(query);
}

// 공개 예정 프로젝트
function tobeProjectList() {
    const query = `call tobeProjectList();`
    return conpro(query);
}

// 제목, 내용 검색
function searchTitleSummary(keyword,userID) {
    const query =
        `call searchTitleSummary('${keyword}','${userID}');`
    return conpro(query);
}

// 키워드 검색
function searchKeyword(keyword,userID) {
    const query = `call searchKeyword('${keyword}','${userID}');`
    return conpro(query);
}

// 프로젝트 글쓴이의 ID 읽어오기
function readWriterID(projectIndex){
    const query = `select userID from project where projectIndex = '${projectIndex}';`

    return conpro(query);
}

module.exports = {
    readProject,
    createProject,
    bestProjectList,
    newProjectList,
    deadlineProjectList,
    tobeProjectList,
    findCateIndex,
    searchTitleSummary,
    searchKeyword,
    createGift,
    readWriterID,
} 