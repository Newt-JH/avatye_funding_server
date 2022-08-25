var express = require('express');
var router = express.Router();
const db = require('../../DB/project/serProjectDB');
const wrap = require('../../util/wrapper');
const wrapper = wrap.wrapper;

// 후원하기
router.post('/', wrapper(async function (req, res) {
    const { projectIndex,giftIndex,paymentIndex,orderPrice,shippingIndex } = req.body
    const userID = req.userID;

    let f = await db.insertOrder(projectIndex,giftIndex,userID,paymentIndex,orderPrice,shippingIndex);
    res.status(201).send(f[0]);
}));



module.exports = router;