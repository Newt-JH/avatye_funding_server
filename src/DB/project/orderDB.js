const cons = require('../DatabaseConn');
// pro > DB 읽어올때 쓰는 모듈 ( 프로미스 반환 / async await 사용하기 위해 사용 )
// tto > row에 대해 읽어올 필요가 없는 쿼리 날릴때 사용
const conpro = cons.conpro;
const con = cons.con;
const trans = cons.tran;


// 주문하기
function insertOrder(projectIndex,giftIndex,userID,paymentIndex,orderPrice,shippingIndex){
    const query = `call insertOrder('${projectIndex}','${giftIndex}','${userID}','${paymentIndex}','${orderPrice}','${shippingIndex}');`
    return conpro(query);
}

// 주문할때 이메일 폰 번호 가져오기
function orderData(userID) {
    const query =
        `call orderUserData('${userID}');`

    return conpro(query);
}

// 주문할때 배송지 가져오기
function orderShippingData(userID) {
    const query =
        `call orderShippingData('${userID}');`

    return conpro(query);
}

// 주문할때 결제 수단 가져오기
function orderPaymentData(userID) {
    const query =
        `call orderPaymentData('${userID}');`

    return conpro(query);
}


module.exports = {
    orderData,
    insertOrder,
    orderShippingData,
    orderPaymentData
} 