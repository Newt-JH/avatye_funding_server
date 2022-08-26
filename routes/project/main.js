const { query } = require('express');
var express = require('express');
var router = express.Router();
const db = require('../../DB/project/mainDB');
const wrap = require('../../util/wrapper');
const wrapper = wrap.wrapper;

// 메인 화면 주목할만한 프로젝트
router.get('/pointproject', wrapper(async function (req, res) {
    const userID = req.userID;

    let f = await db.mdProject(userID);
    return res.status(200).send(f[0]);

}));


// 메인 화면 인기 프로젝트
router.get('/bestproject', wrapper(async function (req, res) {

    let f = await db.bestProject();
    res.status(200).send(f[0]);

}));

module.exports = router;
