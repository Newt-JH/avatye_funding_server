var express = require('express');
var router = express.Router();
const db = require('../../DB/project/serReviewDB');
const wrap = require('../../util/wrapper');
const wrapper = wrap.wrapper;

// 리뷰 가져오기
router.get('/which=:which&projectID=:projectID', wrapper(async function (req, res) {
    const which = req.params.which;
    const projectID = req.params.projectID;
    console.log(which + "   " + projectID);

    const f = await db.readReview(which,projectID);
    res.send(f);

}));

// 리뷰 작성
router.post('/upload', wrapper(async function (req, res) {
    const userID = req.userID;
    const rb = req.body;
    const which = rb.which;
    const projectID = rb.projectID;
    const comment = rb.comment;
    

    db.uploadReview(projectID,userID,comment,which);
    res.send("ok");

}));

module.exports = router;