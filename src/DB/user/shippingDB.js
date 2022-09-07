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

// 배송지 등록
function addShipping(userID, name, adress, phone) {
    const query = `call addShipping('${userID}','${name}','${adress}','${phone}');`
    con(query);
}

// 배송지 수정
function updateShipping(shippingIndex, userID, name, adress, phone) {
    const query = `call updateShipping('${shippingIndex}','${userID}','${name}','${adress}','${phone}');`
    con(query);
}

// 배송지 삭제
function deleteShipping(shippingIndex, userID) {
    const query = `call deleteShipping('${shippingIndex}','${userID}');`
    con(query);
}

module.exports = {
    addShipping,
    updateShipping,
    deleteShipping,
}