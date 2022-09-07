var express = require('express');
var router = express.Router();
const db = require('../../DB/user/shippingDB');
const util = require('../../util/userUtil');
const wrap = require('../../util/wrapper');
const wrapper = wrap.wrapper;
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');

// 배송지 등록
router.post('/', wrapper(async function (req, res) {
  const userID = req.userID;
  const rb = req.body;
  const userName = rb.userName;
  const address = rb.address;
  const phone = rb.phone;

  db.addShipping(userID,userName,address,phone);
  res.status(201).send("ok");
  
}));

// 배송지 수정
router.put('/', wrapper(async function (req, res) {
  const userID = req.userID;
  const rb = req.body;
  const shippingIndex = rb.shippingIndex;
  const userName = rb.userName;
  const address = rb.address;
  const phone = rb.phone;

  db.updateShipping(shippingIndex,userID,userName,address,phone);
  res.status(201).send("ok");
  
}));

// 배송지 삭제
router.delete('/', wrapper(async function (req, res) {
  const userID = req.userID;
  const rb = req.body;
  const shippingIndex = rb.shippingIndex;

  db.deleteShipping(shippingIndex,userID);
  res.status(205).send("ok");
  
}));

module.exports = router;
