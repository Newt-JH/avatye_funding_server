var express = require('express');
var router = express.Router();
const db = require('../../DB/project/serProjectDB');
const wrap = require('../../util/wrapper');
const wrapper = wrap.wrapper;

// 프로젝트 만들기
router.post('/', wrapper(async function (req, res) {
    const { projectIndex,giftIndex,paymentIndex,orderPrice,shippingIndex } = req.body
    const userID = req.userID;

    let f = await db.insertOrder(projectIndex,giftIndex,userID,paymentIndex,orderPrice,shippingIndex);
    res.send('ok');
}));



module.exports = router;