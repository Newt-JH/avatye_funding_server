const cons = require('../DatabaseConn');
// pro > DB 읽어올때 쓰는 모듈 ( 프로미스 반환 / async await 사용하기 위해 사용 )
// tto > row에 대해 읽어올 필요가 없는 쿼리 날릴때 사용
const conpro = cons.conpro;
const con = cons.con;
const trans = cons.tran;

// 메인 화면 주목할만한 프로젝트
// 일단 목표 금액이 가장 높은 프로젝트 표시
function mdProject(userID) {
    const query = `call mdProject('${userID}');`

    return conpro(query);
}

// 메인 화면 인기 프로젝트
// 일단 판매율 가장 높은 프로젝트 표시
function bestProject() {
    const query = `call bestProject();`
    return conpro(query);
}


module.exports = {
    mdProject,
    bestProject
} 