var express = require('express');
var router = express.Router();
const db = require('../DB/serProject');
const wrap = require('./wrapper');
const wrapper = wrap.wrapper;


//전체 프로젝트 불러오기
router.get('/', wrapper(async function(req, res, next) {
    
    let f = await db.readProject();
    res.send(f);
    
}));

//프로젝트 생성
router.post('/createProject', function(req, res) {

    let f = db.createProject(req);
    res.send(f);
})

//프로젝트 상세 불러오기
router.get('/projectDetail/:id', wrapper(async function(req, res) {

    let f = await db.findProject(req);
    res.send(f);
}))

//카테고리에 해당하는 프로젝트 불러오기
router.get('/:category', wrapper(async function(req, res) {

    let f = await db.readProjectByCate(req);
    res.send(f);

}))

module.exports = router;