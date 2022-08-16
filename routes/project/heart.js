var express = require('express');
var router = express.Router();
const db = require('../../DB/project/serHeartDB');
const wrap = require('../../util/wrapper');
const wrapper = wrap.wrapper;

// 좋아요 추가 / 삭제
router.get('/add/:id', wrapper(async function (req, res) {
    const proIndex = req.params.id;
    const userID = req.userID;
    
        let f = await db.heart(userID, proIndex);
        return res.send(f[0][0]);

}));

// 찜 목록
router.get('/list', wrapper(async function (req, res) {
    const userID = req.userID;
    
        let f = await db.heartList(userID);
        return res.send(f);
}));

module.exports = router;
