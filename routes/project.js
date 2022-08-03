var express = require('express');
var router = express.Router();
const db = require('../DB/serProject');
const wrap = require('./wrapper');
const wrapper = wrap.wrapper;


/* GET users listing. */
router.get('/', wrapper(async function(req, res, next) {
    
    let f = await db.readProject();
    res.send(f);
    
}));

//프로젝트 만들기
router.post('/createProject', function(req, res) {
    
    let f = db.createProject(req);
    res.send(f);
})

//프로젝트 상세 불러오기
router.get('/projectDetail/:id', wrapper(async function(req, res) {

    let f = await db.findProject(req);
    res.send(f);
}))

module.exports = router;
