var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const wrap = require('./util/wrapper');
const wrapper = wrap.wrapper;
const secret = 'hwan';
const jwt = require('jsonwebtoken');

// 토큰 검증
async function verifyToken(token) {
  try {
      decodeToken = jwt.verify(token, secret);
      return decodeToken;
  } catch (err) {
      if (err.name === 'TokenExpiredError') {
          return {
              code: 419,
              massage: '토큰이 만료되었습니다.'
          }
      }
      return {
          code: 401,
          massage: '유효하지 않은 토큰입니다.'
      }
  }
}

// 토큰에서 userID 읽어오기
const readToken = wrapper( async (req,res,next) => {
  const token = req.get('user_token');
  if (token !== undefined) {
    // 토큰 가져온 후 검증 - 에러 코드 or 유저 판별 DIV 반환
    const msg = await verifyToken(token);
    // 에러 발생 시 res로 에러 반환
    if (msg.code) {
        console.log(msg.code + " : " + msg.massage);
        req.err = msg.code + " : " + msg.massage;
        next();
    } else {
        req.userID = msg.userID;
        next();
    }
} else {
  req.userID = undefined;
  next();
}
})

// 토큰이 무조건 있어야 하는 값들의 경우 userID 값이 이상하면 오류 반환
// 프로젝트들의 경우, 무조건 참이어야 하지는 않으므로 오류 미반환
const errReturn = (req,res,next) => {
  if(req.err){
    return res.status(401).send({ err: req.err });
  }
  next();
}

var indexRouter = require('./routes/index');
var userRouter = require('./routes/user/user');
var projectRouter = require('./routes/project/project');
var mypageRouter = require('./routes/user/myPage');
var anotherProfileRouter = require('./routes/user/anotherUserProfile');
var mainprojectRouter = require('./routes/project/main');
var projectDetailRouter = require('./routes/project/detail');
var heartRouter = require('./routes/project/heart');
var followRouter = require('./routes/user/follow');
var categoryRouter = require('./routes/project/category');
var searchRouter = require('./routes/project/search');
var reviewRouter = require('./routes/project/review');
//이미지 저장
var imgRouter = require('./routes/project/img');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

let corsOptions = {
  origin: 'https://tumblbug.avatye.com:8080',
  credentials: true
}

app.use(readToken);
app.use(['/mypage','/heart','/follow','/project/createProject','/user/update','/review/comunity','/review/update','/user/shipping','/user/passwordCheck','/user/payment'],errReturn);

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/project',projectRouter);
app.use('/mypage', mypageRouter);
app.use('/u', anotherProfileRouter);
app.use('/main', mainprojectRouter);
app.use('/detail',projectDetailRouter);
app.use('/heart',heartRouter);
app.use('/follow',followRouter);
app.use('/category',categoryRouter);
app.use('/search',searchRouter);
app.use('/review',reviewRouter);
//이미지
app.use('/img', imgRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;