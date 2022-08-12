const jwt = require('jsonwebtoken');
const wrap = require('../util/wrapper');
const wrapper = wrap.wrapper;
const secret = 'hwan'

// 토큰 검증
 async function verifyToken(token){
    try{
        decodeToken = jwt.verify(token,secret);
        return decodeToken;
    }catch(err){
        if(err.name === 'TokenExpiredError'){
            return {
                code:419,
                massage: '토큰이 만료되었습니다.'
            }
        }
        return {
            code: 401,
            massage: '유효하지 않은 토큰입니다.'
        }
    }
}

// 토큰에서 유저 DIV 읽어와주는 부분 모듈화
const readToken = wrapper(async function (req, res, query) {
    // 토큰 가져오기
    const toke = req.get('user_token');
    if (toke !== undefined) {
        // 토큰 가져온 후 검증 - 에러 코드 or 유저 판별 DIV 반환
        const msg = await verifyToken(toke);
        // 에러 발생 시 res로 에러 반환
        if (msg.code) {
            console.log(msg.code + " : " + msg.massage);
            return res.send({ err: msg.code + " : " + msg.massage });
        } else {
            query(msg.userDIV);
        }
    } else {
        query();
    }
})

module.exports = {
    verifyToken,
    readToken
}