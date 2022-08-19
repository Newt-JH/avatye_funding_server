var express = require('express');
var router = express.Router();
const db = require('../../DB/project/serCategoryDB');
const wrap = require('../../util/wrapper');
const wrapper = wrap.wrapper;


// 전체 상품 읽어오기
router.get('/all', wrapper(async function (req, res) {
    const userID = req.userID;
    let f = await db.readCategory(userID);

    res.send(f);
}));

// 카테고리별 상품 읽어오기
router.get('/:id', wrapper(async function (req, res) {
    const userID = req.userID;
    const cateName = decodeURIComponent(req.params.id);
    let f = await db.oneCategory(cateName,userID);

    res.send(f);
}));

module.exports = router;
