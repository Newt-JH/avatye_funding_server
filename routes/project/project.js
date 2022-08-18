var express = require('express');
var router = express.Router();
const db = require('../../DB/project/serProjectDB');
const wrap = require('../../util/wrapper');
const wrapper = wrap.wrapper;

// 전체 프로젝트 불러오기
router.get('/', wrapper(async function (req, res, next) {
    const userID = req.userID;

    let f = await db.readProject(userID);
    res.send(f);

}));

// 프로젝트 만들기
router.post('/createProject', wrapper(async function (req, res) {
    const { category, detailcategory, longTitle, shortTitle, summary, searchTag, imgUrl } = req.body
    // 토큰 가져오기
    const userID = req.userID;
    // 카테고리 인덱스 찾아오기
    const categoryindex = await db.findCateIndex(category, detailcategory);
    console.log(categoryindex);
    const f = await db.createProject(categoryindex[0].cateIndex, userID, longTitle, shortTitle, summary, imgUrl, searchTag);

    return res.send(f);

}));

// 인기 상품 불러오기
router.get('/bestprojectlist', wrapper(async function (req, res) {
    const userID = req.userID;

    let f = await db.bestProjectList(userID);
    res.send(f);

}));

// 신규 상품 불러오기
router.get('/newprojectlist', wrapper(async function (req, res) {
    const userID = req.userID;

    let f = await db.newprojectlist(userID);
    res.send(f);
}));

// 마감 임박 상품 불러오기
router.get('/deadlineprojectlist', wrapper(async function (req, res) {
    const userID = req.userID;

    let f = await db.deadlineprojectlist(userID);
    res.send(f);

}));

// 공개 예정 상품 불러오기
router.get('/tobeprojectlist', wrapper(async function (req, res) {

    let f = await db.tobeprojectlist(req);
    res.send(f);

}));

module.exports = router;