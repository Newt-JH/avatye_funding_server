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

// 결제 등록
function addPayment(userID,bank,accountNumber,userName,userBirth,cardNumber,cardEndDate,cardPassword,div) {
    const query = `call addPayment('${userID}','${bank}','${accountNumber}','${userName}','${userBirth}','${cardNumber}','${cardEndDate}','${cardPassword}','${div}')`
    con(query);
}

// 결제 삭제
function deletePayment(paymentIndex,userID) {
    const query = `call deletePayment('${paymentIndex}','${userID}');`
    con(query);
}

module.exports = {
    addPayment,
    deletePayment,
}