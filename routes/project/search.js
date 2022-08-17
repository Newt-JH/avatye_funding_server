var express = require('express');
var router = express.Router();
const db = require('../../DB/project/serProjectDB');
const wrap = require('../../util/wrapper');
const wrapper = wrap.wrapper;

// 전체 프로젝트 불러오기
router.get('/:id', wrapper(async function (req, res) {
    const userID = req.userID;
    const search = decodeURIComponent(req.params.id); 
    console.log(search);
    if(search.slice(0,1) === "샵"){
        let f = await db.searchKeyword(search,userID);
        res.send(f);
    }else{
        console.log("진입");
        let f = await db.searchTitleSummary(search,userID);
        console.log(f);
        res.send(f);
    }

}));

module.exports = router;