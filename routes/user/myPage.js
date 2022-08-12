var express = require('express');
var router = express.Router();
const db = require('../../DB/user/serMypageDB');
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

/* mypage 조회 comment 반환 */
router.get('/', wrapper(async function (req, res) {
    
    const query = async function (userDIV) {
        const userComment = await db.myPageComment(userDIV);
        return res.send(userComment[0]);
    }

    readHeart(req, res, query);

}));

/* mypage 조회 닉네임, 사진 , 가입한 날짜 정보 반환 */
router.get('/profile', wrapper(async function (req, res) {

    const query = async function (userDIV) {
        const userComment = await db.myProfile(userDIV);
        return res.send(userComment[0]);
    }

    readHeart(req, res, query);

}));

/* mypage 조회 올린 프로젝트 정보 반환 */
router.get('/upload', wrapper(async function (req, res) {

    const query = async function (userDIV) {
        const upLoadProject = await db.myUploadProject(userDIV);
        return res.send(upLoadProject);
    }

    readHeart(req, res, query);

}));

/* mypage 조회 올린 프로젝트 수 반환 */
router.get('/uploadcount', wrapper(async function (req, res) {

    const query = async function (userDIV) {
        const upLoadCount = await db.myUploadCount(userDIV);
        return res.send(upLoadCount[0]);
    }

    readHeart(req, res, query);

}));

/* mypage 조회 구매한 프로젝트 정보 반환 */
router.get('/buy', wrapper(async function (req, res) {

    const query = async function (userDIV) {
        const buyProject = await db.myBuyProject(userDIV);
        return res.send(buyProject);
    }

    readHeart(req, res, query);

}));

/* mypage 구매한 프로젝트 수 반환 */
router.get('/buycount', wrapper(async function (req, res) {

    const query = async function (userDIV) {
        const upLoadCount = await db.myBuyCount(userDIV);
        return res.send(upLoadCount[0]);
    }
    readHeart(req, res, query);


}));

module.exports = router;
