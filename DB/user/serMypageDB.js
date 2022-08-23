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
    const query = `call myPageComment('${userID}');`
    return conpro(query);
}

// 내 프로필 정보 반환
function myProfile(userID) {
    const query =
        `call myProfile('${userID}');`
    return conpro(query);
}

// 내가 올린 프로젝트
function myUploadProject(userID) {
    const query =
        `call myUploadProject('${userID}');`
    return conpro(query);
}

// 내가 올린 프로젝트 개수
function myUploadCount(userID) {
    const query =
        `call uploadCount('${userID}');`
    return conpro(query);
}

// 내가 후원한 프로젝트
function myBuyProject(userID) {
    const query = `call myBuyProject('${userID}');`
    return conpro(query);
}

// 내가 후원한 프로젝트 개수
function myBuyCount(userID) {
    const query =
        `call buyCount('${userID}');`
    return conpro(query);
}

// 정보 수정 시 반환할 내 정보
function myInfor(userID) {
    const query = `call myInfor('${userID}');`
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