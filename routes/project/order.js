var express = require('express');
var router = express.Router();
const db = require('../../DB/project/orderDB');
const wrap = require('../../util/wrapper');
const wrapper = wrap.wrapper;

// 후원하기
router.post('/', wrapper(async function (req, res) {
    const { projectIndex,giftIndex,paymentIndex,orderPrice,shippingIndex } = req.body
    const userID = req.userID;

    let f = await db.insertOrder(projectIndex,giftIndex,userID,paymentIndex,orderPrice,shippingIndex);
    res.status(201).send(f[0]);
}));

// 주문 시 유저 정보 가져오기
router.get('/', wrapper(async function (req, res) {
    const userID = req.userID;
    
    let orderData = await db.orderData(userID);
    let orderShippingData = await db.orderShippingData(userID);
    let orderPaymentData = await db.orderPaymentData(userID);
    res.status(201).send({
        userData : orderData[0][0],
        shippingData : orderShippingData[0],
        paymentData : orderPaymentData[0]
    });
}));



module.exports = router;