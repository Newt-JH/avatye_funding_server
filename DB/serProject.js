const cons = require('./DatabaseConn');
// pro > DB 읽어올때 쓰는 모듈 ( 프로미스 반환 / async await 사용하기 위해 사용 )
// tto > row에 대해 읽어올 필요가 없는 쿼리 날릴때 사용
const conpro = cons.conpro;
const con = cons.con;

// 전체 프로젝트 불러오기
function readProject() {
    const query = 'select * from project'

    return conpro(query);
}

// proID에 해당하는 프로젝트 상세 불러오기
function findProject(req) {
    const projectIndex = req.params.id;
    const query = `select * from project where projectIndex = ${projectIndex}`

    return conpro(query);
}

// 프로젝트 등록하기
function createProject(req) {   
    const {cateIndex, userID, longTitle, shortTitle, summary, profileIMG, goalprice, beginDate, endDate, contents, video, webAddress, searchTag}= req.body;

    const query = `insert into project (cateIndex, userID, longTitle, shortTitle, summary, profileIMG, goalprice, beginDate, endDate, contents, video, webAddress, searchTag) values (${cateIndex}, ${userID}, '${longTitle}', '${shortTitle}', '${summary}', '${profileIMG}', ${goalprice}, '${beginDate}', '${endDate}', '${contents}', '${video}', '${webAddress}', '${searchTag}')`
    return con(query);
}

// 카테고리에 해당하는 프로젝트 불러오기
function readProjectByCate(req) {
    const category = req.params.category;

    //const query = `select * from project p join category c on p.cateIndex = c.cateIndex where name = ${category}`
    const query = `select projectIndex, p.cateIndex, c.name, longTitle, summary, profileIMG, endDate, nowAmount from project p join category c on p.cateIndex = c.cateIndex where name = '${category}'`

    return conpro(query);
}

module.exports = {
    readProject,
    createProject,
    findProject,
    readProjectByCate
}