var express = require('express');
var router = express.Router();
const db = require('../../DB/project/serReviewDB');
const db2 = require('../../DB/project/serProjectDB');
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
router.post('/uploadReview', wrapper(async function (req, res) {
    const userID = req.userID;
    const rb = req.body;
    const which = rb.which;
    const projectID = rb.projectID;
    const comment = rb.comment;

    db.uploadReview(projectID,userID,comment,which);
    res.send("ok");

}));

// 업데이트 작성
router.post('/uploadUpdate', wrapper(async function (req, res) {
    const userID = req.userID;
    const rb = req.body;
    const which = rb.which;
    const projectID = rb.projectID;
    const comment = rb.comment;

    // 댓글 DIV가 update가 아니라면 오류 반환
    if(which !== "update"){
        return res.status(431).send({ err: "431 : Community와 Review는 다른 탭을 이용해주세요." })
    }
    // project의 작성자 ID 불러오기
    const f = await db2.readWriterID(projectID);
    // update 작성자 아이디와 project 작성자 ID가 일치할때만 insert, 아닐 시 오류 반환
    if(f[0].userID === userID){
        db.uploadReview(projectID,userID,comment,which);
        res.send("ok");
    }else{
        res.send({ err: "430 : 업로드한 유저가 아닙니다." })
    }
}));



module.exports = router;