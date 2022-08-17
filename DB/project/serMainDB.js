const cons = require('../DatabaseConn');
// pro > DB 읽어올때 쓰는 모듈 ( 프로미스 반환 / async await 사용하기 위해 사용 )
// tto > row에 대해 읽어올 필요가 없는 쿼리 날릴때 사용
const conpro = cons.conpro;
const con = cons.con;
const trans = cons.tran;

// 메인 화면 주목할만한 프로젝트
// 일단 목표 금액이 가장 높은 프로젝트 표시
function mdProject(userID) {
    const query =
        `select percent,project.projectIndex,longTitle,profileIMG,goalPrice,nowPrice,nickName,name,project.userID,hc.heartCheck
        from (select (project.nowPrice/project.goalPrice * 100) as percent,
                project.projectIndex,longTitle,profileIMG,goalPrice,nowPrice,nickName,c.name,uP.userID
                from project
                    join userProfile uP
                        on project.userID = uP.userID
                    join category c
                        on project.cateIndex = c.cateIndex
                where endDate > now()
                order by goalprice desc
                limit 8) as project
                    left join (select projectIndex,heartCheck from heart where userID = '${userID}') as hc
                        on hc.projectIndex = project.projectIndex;`

    return conpro(query);
}

// 메인 화면 인기 프로젝트
// 일단 판매율 가장 높은 프로젝트 표시
function bestProject() {
    const query =
        `select (p.nowPrice/p.goalPrice * 100) as percent,projectIndex, longTitle,
    profileIMG, goalPrice,endDate,nickName,c.name,uP.userID, DATE_ADD(NOW(), INTERVAL 9 HOUR) as now
    from project p
        join category c
            on p.cateIndex = c.cateIndex
        join userProfile uP
            on p.userID = uP.userID
    where endDate > now()
    order by percent desc
        limit 8;`
    return conpro(query);
}


module.exports = {
    mdProject,
    bestProject
} 