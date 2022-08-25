var express = require('express');
var router = express.Router();
const db = require('../../DB/project/serProjectDB');
const wrap = require('../../util/wrapper');
const wrapper = wrap.wrapper;

// 전체 프로젝트 불러오기
router.get('/:id', wrapper(async function (req, res) {
    const userID = req.userID;
    const search = decodeURIComponent(req.params.id); 
    if(search.slice(0,1) === "#"){
        let f = await db.searchKeyword(search.slice(1),userID);
        res.status(200).send(f[0]);
    }else{
        let f = await db.searchTitleSummary(search,userID);
        res.status(200).send(f[0]);
    }

}));

module.exports = router;