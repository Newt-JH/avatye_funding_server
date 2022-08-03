var express = require('express');
var router = express.Router();
const multer = require('multer')
const path = require('path');
const cors = require('cors');
const app = express();
const wrap = require('./wrapper');
const wrapper = wrap.wrapper;

let corsOption = {
    origin : "*",
    credential : true,
};

app.use(cors(corsOption))

const storage = multer.diskStorage({
    destination : function(req, file, cb) {
        cb(null, path.resolve("Users", "Downloads", "../../../../avatye_client/public/"));
    },
    filename : function(req, file, cb) {
        const ext = path.extname(file.originalname);
        cb(null, path.basename(file.originalname, ext) + "_" + Date.now() + ext);
    },
});

const upload = multer({
    storage : storage
})

//이미지 저장
router.post('/', upload.single('img'), wrapper(async(req, res)=> {
    let image= req.file.path;
    //이미지 미리보기
    if(image === undefined){
        return res.send("이미지없음");
    }
    res.send(image);
}));

module.exports = router;