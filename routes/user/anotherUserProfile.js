var express = require('express');
var router = express.Router();
const db = require('../../DB/user/serAnotherUserProfileDB');
const anotherdb = require('../../DB/user/serMypageDB');
const middle = require('../../middleware/userMiddleWare');
const wrap = require('../../util/wrapper');
const wrapper = wrap.wrapper;
const readToken = middle.readToken;

/* 다른 유저 ID 조회 comment 반환 */
router.get('/:id', wrapper(async function (req, res) {
    userDIV = req.params.id;
    const userComment = await db.anotherPage(userDIV);
    return res.send(userComment[0]);
}
));

/* 다른 유저 ID 조회 프로필 사진, 닉네임, 가입 날짜 반환 */
router.get('/:id/profile', wrapper(async function (req, res) {
    userDIV = req.params.id;

    const userComment = await db.anotherProfile(userDIV);
    return res.send(userComment[0]);
}
));

/* 다른 유저 ID 조회 올린 프로젝트 정보 반환 */
router.get('/:id/upload', wrapper(async function (req, res) {
    userDIV = req.params.id;

    const query = async function (myDIV) {
        const upLoadProject = await db.anotherUploadProject(userDIV, myDIV);
        return res.send(upLoadProject);
    }

    readToken(req, res, query);
}));

/* 다른 유저 ID 조회 구매한 프로젝트 정보 반환 */
router.get('/:id/buy', wrapper(async function (req, res) {
    userDIV = req.params.id;

    const query = async function (myDIV) {
        const buyProject = await db.anotherBuyProject(userDIV, myDIV);
        return res.send(buyProject);
    }

    readToken(req, res, query);
}));

/* 다른 유저 ID 조회 올린 프로젝트 정보 반환 */
router.get('/:id/uploadcount', wrapper(async function (req, res) {
    userDIV = req.params.id;
    const upLoadProjectCount = await anotherdb.myUploadCount(userDIV);
    return res.send(upLoadProjectCount[0]);
}
));

/* 다른 유저 ID 조회 구매한 프로젝트 정보 반환 */
router.get('/:id/buycount', wrapper(async function (req, res) {
    userDIV = req.params.id;
    const buyProjectCount = await anotherdb.myBuyCount(userDIV);
    return res.send(buyProjectCount[0]);
}
));

module.exports = router;