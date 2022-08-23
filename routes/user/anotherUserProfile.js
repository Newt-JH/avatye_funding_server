var express = require('express');
var router = express.Router();
const db = require('../../DB/user/serAnotherUserProfileDB');
const anotherdb = require('../../DB/user/serMypageDB');
const wrap = require('../../util/wrapper');
const wrapper = wrap.wrapper;

/* 다른 유저 ID 조회 comment 반환 */
router.get('/:id', wrapper(async function (req, res) {
    userID = req.params.id;
    const userComment = await db.anotherPage(userID);
    return res.send(userComment[0][0]);
}
));

/* 다른 유저 ID 조회 프로필 사진, 닉네임, 가입 날짜 반환 */
router.get('/:id/profile', wrapper(async function (req, res) {
    userID = req.params.id;

    const userProfile = await db.anotherProfile(userID);
    const upLoadCount = await anotherdb.myUploadCount(userID);
    const buyCount = await anotherdb.myBuyCount(userID);
    const resData = {
        userProfile: userProfile[0][0],
        upLoadCount: upLoadCount[0][0],
        buyCount: buyCount[0][0]
    }
    return res.send(resData);
}
));

/* 다른 유저 ID 조회 올린 프로젝트 정보 반환 */
router.get('/:id/upload', wrapper(async function (req, res) {
    const userID = req.params.id;
    const myID = req.userID;

    const upLoadProject = await db.anotherUploadProject(userID, myID);
    return res.send(upLoadProject[0]);

}));

/* 다른 유저 ID 조회 구매한 프로젝트 정보 반환 */
router.get('/:id/buy', wrapper(async function (req, res) {
    const userID = req.params.id;
    const myID = req.userID;

    const buyProject = await db.anotherBuyProject(userID, myID);
    return res.send(buyProject[0]);

}));

module.exports = router;