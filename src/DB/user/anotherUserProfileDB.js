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
    const query = `call AnotherPageComment('${userID}');`
    return conpro(query);
}

function anotherProfile(userID) {
    const query =
        `call anotherProfile('${userID}');`
    return conpro(query);
}

function anotherUploadProject(userID, myID) {
    const query =
        `call anotherUploadProject('${userID}','${myID}');`
    return conpro(query);
}

function anotherBuyProject(userID, myID) {
    const query = `call anotherBuyProject('${userID}','${myID}');`
    return conpro(query);
}




module.exports = {
    anotherPage,
    anotherUploadProject,
    anotherBuyProject,
    anotherProfile
}