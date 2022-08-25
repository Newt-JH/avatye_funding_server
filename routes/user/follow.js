var express = require('express');
var router = express.Router();
const db = require('../../DB/user/serFollowDB');
const wrap = require('../../util/wrapper');
const wrapper = wrap.wrapper;

// 팔로우 추가 / 삭제
router.get('/add/:id', wrapper(async function (req, res) {
    const followedID = req.params.id;
    const userID = req.userID;

    let f = await db.follow(userID, followedID);
    return res.status(201).send(f[0][0]);

}));

// 내 팔로워 목록
router.get('/follower', wrapper(async function (req, res) {
    const userID = req.userID;

    let f = await db.followerList(userID);
    return res.status(200).send(f[0]);

}))

// 내가 팔로우 한 사람 목록
router.get('/following', wrapper(async function (req, res) {
    const userID = req.userID;

    let f = await db.followingList(userID);
    return res.status(200).send(f[0]);

}))

// 다른 유저 팔로워 목록
router.get('/anotherfollower/:id', wrapper(async function (req, res) {
    const userID = req.params.id;

    let f = await db.followerList(userID);
    return res.status(200).send(f[0]);

}))

// 다른 유저 팔로우 한 사람 목록
router.get('/anotherfollowing/:id', wrapper(async function (req, res) {
    const userID = req.params.id;

    let f = await db.followingList(userID);
    return res.status(200).send(f[0]);

}))

module.exports = router;