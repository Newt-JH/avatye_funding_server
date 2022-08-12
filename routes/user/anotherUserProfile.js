var express = require('express');
var router = express.Router();
const db = require('../../DB/user/serAnotherUserProfileDB');
const anotherdb = require('../../DB/user/serMypageDB');
const middle = require('../../middleware/userMiddleWare');
const wrap = require('../../util/wrapper');
const wrapper = wrap.wrapper;

// 찜 목록 나타내는 부분 모듈화 처리
const readHeart = wrapper(async function (req, res, query) {
    // 토큰 가져오기
    const toke = req.get('user_token');
    if (toke !== undefined) {
        // 토큰 가져온 후 검증 - 에러 코드 or 유저 판별 DIV 반환
        const msg = await middle.verifyToken(toke);
        // 에러 발생 시 res로 에러 반환
        if (msg.code) {
            console.log(msg.code + " : " + msg.massage);
            return res.send({ err: msg.code + " : " + msg.massage });
        } else {
            // 유저 DIV 값으로 DB에서 정보 읽어오기
            console.log(msg.userDIV);
            query(msg.userDIV);
        }
    } else {
        console.log("토큰 없음");
        query(msg.userDIV);
    }
})

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
        const upLoadProject = await db.anotherUploadProject(userDIV,myDIV);
        return res.send(upLoadProject);
    }

    readHeart(req, res, query);
}));

/* 다른 유저 ID 조회 구매한 프로젝트 정보 반환 */
router.get('/:id/buy', wrapper(async function (req, res) {
    userDIV = req.params.id;

    const query = async function (myDIV) {
        const buyProject = await db.anotherBuyProject(userDIV,myDIV);
        return res.send(buyProject);
    }

    readHeart(req, res, query);
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