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

    const userProfile = await db.myProfile(userID);
    const upLoadCount = await db.myUploadCount(userID);
    const buyCount = await db.myBuyCount(userID);
    const resData = {
        userProfile : userProfile[0],
        upLoadCount : upLoadCount[0],
        buyCount    : buyCount[0]
    }
    return res.send(resData);

}));

/* mypage 조회 올린 프로젝트 정보 반환 */
router.get('/upload', wrapper(async function (req, res) {
    const userID = req.userID;

    const upLoadProject = await db.myUploadProject(userID);
    return res.send(upLoadProject);

}));

/* mypage 조회 구매한 프로젝트 정보 반환 */
router.get('/buy', wrapper(async function (req, res) {
    const userID = req.userID;

    const buyProject = await db.myBuyProject(userID);
    return res.send(buyProject);

}));

module.exports = router;
