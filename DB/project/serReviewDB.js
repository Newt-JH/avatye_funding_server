const cons = require('../DatabaseConn');
// pro > DB 읽어올때 쓰는 모듈 ( 프로미스 반환 / async await 사용하기 위해 사용 )
// tto > row에 대해 읽어올 필요가 없는 쿼리 날릴때 사용
const conpro = cons.conpro;
const con = cons.con;
const trans = cons.tran;

// 전체 리뷰 or 업데이트 불러오기
function readReview(which,proIndex) {
    const query =
        `select review.*,nickName
        from review
        join userProfile uP on review.userID = uP.userID
          where reviewDIV = '${which}' and projectIndex = '${proIndex}';`

    return conpro(query);
}

// 리뷰 or 업데이트 등록
function uploadReview(proIndex,userID,comment,which) {
    const query =
        `insert 
        into review(projectIndex, userID, comment, reviewDiv,uploadDate) 
        VALUES ('${proIndex}','${userID}','${comment}','${which}',DATE_ADD(NOW(), INTERVAL 9 HOUR));`

    con(query);
}

module.exports = {
    readReview,
    uploadReview
} 