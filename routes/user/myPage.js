var express = require('express');
var router = express.Router();
const db = require('../../DB/user/serMypageDB');
const middle = require('../../middleware/userMiddleWare');
const wrap = require('../../util/wrapper');
const wrapper = wrap.wrapper;
const readToken = middle.readToken;

/* mypage 조회 comment 반환 */
router.get('/', wrapper(async function (req, res) {
    
    const query = async function (userDIV) {
        const userComment = await db.myPageComment(userDIV);
        return res.send(userComment[0]);
    }

    readToken(req, res, query);

}));

/* mypage 조회 닉네임, 사진 , 가입한 날짜 정보 반환 */
router.get('/profile', wrapper(async function (req, res) {

    const query = async function (userDIV) {
        const userComment = await db.myProfile(userDIV);
        return res.send(userComment[0]);
    }

    readToken(req, res, query);

}));

/* mypage 조회 올린 프로젝트 정보 반환 */
router.get('/upload', wrapper(async function (req, res) {

    const query = async function (userDIV) {
        const upLoadProject = await db.myUploadProject(userDIV);
        return res.send(upLoadProject);
    }

    readToken(req, res, query);

}));

/* mypage 조회 올린 프로젝트 수 반환 */
router.get('/uploadcount', wrapper(async function (req, res) {

    const query = async function (userDIV) {
        const upLoadCount = await db.myUploadCount(userDIV);
        return res.send(upLoadCount[0]);
    }

    readToken(req, res, query);

}));

/* mypage 조회 구매한 프로젝트 정보 반환 */
router.get('/buy', wrapper(async function (req, res) {

    const query = async function (userDIV) {
        const buyProject = await db.myBuyProject(userDIV);
        return res.send(buyProject);
    }

    readToken(req, res, query);

}));

/* mypage 구매한 프로젝트 수 반환 */
router.get('/buycount', wrapper(async function (req, res) {

    const query = async function (userDIV) {
        const upLoadCount = await db.myBuyCount(userDIV);
        return res.send(upLoadCount[0]);
    }
    readToken(req, res, query);


}));

module.exports = router;
