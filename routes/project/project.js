var express = require('express');
var router = express.Router();
const db = require('../../DB/project/projectDB');
const wrap = require('../../util/wrapper');
const wrapper = wrap.wrapper;

// 전체 프로젝트 불러오기
router.get('/', wrapper(async function (req, res, next) {
    const userID = req.userID;

    let f = await db.readProject(userID);
    res.status(200).send(f[0]);

}));

// 프로젝트 만들기
router.post('/', wrapper(async function (req, res) {
    const { category, detailcategory, longTitle, shortTitle, summary, searchTag, imgUrl, contents, giftData, endDate, startDate, goalprice } = req.body
    // 토큰 가져오기
    const userID = req.userID;
    // 카테고리 인덱스 찾아오기
    const categoryindex = await db.findCateIndex(category, detailcategory);
    const f = await db.createProject(categoryindex[0][0].cateIndex, userID, longTitle, shortTitle, summary, imgUrl, searchTag, contents, startDate, endDate, goalprice);
    const projectId = f.insertId;
    // 선물 등록
    if (giftData[0].giftTitle !== '') {
        giftData.map((item) => {
        console.log(item)
        return db.createGift(item.giftCount, item.giftDeliveryDate, item.giftDetail, item.giftPrice, item.giftStock, item.giftTitle, projectId)
    })
    }
    res.status(201).send('ok');

}));

// 인기 상품 불러오기
router.get('/bestprojectlist', wrapper(async function (req, res) {
    const userID = req.userID;

    let f = await db.bestProjectList(userID);
    res.status(200).send(f[0]);

}));

// 신규 상품 불러오기
router.get('/newprojectlist', wrapper(async function (req, res) {
    const userID = req.userID;

    let f = await db.newProjectList(userID);
    res.status(200).send(f[0]);
}));

// 마감 임박 상품 불러오기
router.get('/deadlineprojectlist', wrapper(async function (req, res) {
    const userID = req.userID;

    let f = await db.deadlineProjectList(userID);
    res.status(200).send(f[0]);

}));

// 공개 예정 상품 불러오기
router.get('/tobeprojectlist', wrapper(async function (req, res) {

    let f = await db.tobeProjectList();
    res.status(200).send(f[0]);

}));

module.exports = router;