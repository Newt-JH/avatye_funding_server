var express = require('express');
var router = express.Router();
const db = require('../../DB/user/serMypageDB');
const wrap = require('../../util/wrapper');
const wrapper = wrap.wrapper;

/* mypage 조회 comment 반환 */
router.get('/', wrapper(async function (req, res) {
    const userID = req.userID;

    const userComment = await db.myPageComment(userID);
    return res.send(userComment[0]);

}));

/* mypage 조회 닉네임, 사진 , 가입한 날짜 정보 반환 */
router.get('/profile', wrapper(async function (req, res) {
    const userID = req.userID;

    const userComment = await db.myProfile(userID);
    return res.send(userComment[0]);

}));

/* mypage 조회 올린 프로젝트 정보 반환 */
router.get('/upload', wrapper(async function (req, res) {
    const userID = req.userID;

    const upLoadProject = await db.myUploadProject(userID);
    return res.send(upLoadProject);

}));

/* mypage 조회 올린 프로젝트 수 반환 */
router.get('/uploadcount', wrapper(async function (req, res) {
    const userID = req.userID;

    const upLoadCount = await db.myUploadCount(userID);
    return res.send(upLoadCount[0]);

}));

/* mypage 조회 구매한 프로젝트 정보 반환 */
router.get('/buy', wrapper(async function (req, res) {
    const userID = req.userID;

    const buyProject = await db.myBuyProject(userID);
    return res.send(buyProject);

}));

/* mypage 구매한 프로젝트 수 반환 */
router.get('/buycount', wrapper(async function (req, res) {
    const userID = req.userID;

    const upLoadCount = await db.myBuyCount(userID);
    return res.send(upLoadCount[0]);

}));

module.exports = router;
