var express = require('express');
var router = express.Router();
const db = require('../../DB/user/paymentDB');
const util = require('../../util/userUtil');
const wrap = require('../../util/wrapper');
const wrapper = wrap.wrapper;
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');

// 계좌 or 카드 등록
router.post('/', wrapper(async function (req, res) {
  const userID = req.userID;
  const rb = req.body;
  let bank = rb.bank === undefined ? 'null': rb.bank;
  let accountNumber = rb.accountNumber === undefined ? 'null': rb.accountNumber;
  let userName = rb.userName === undefined ? 'null': rb.userName;
  let userBirth = rb.userBirth === undefined ? 'null': rb.userBirth;
  let cardNumber = rb.cardNumber === undefined ? 'null': rb.cardNumber;
  let cardEndDate = rb.cardEndDate === undefined ? 'null': rb.cardEndDate;
  let cardPassword = rb.cardPassword === undefined ? 'null': rb.cardPassword;
  let div = rb.div === undefined ? 'null': rb.div;

  db.addPayment(userID,bank,accountNumber,userName,userBirth,cardNumber,cardEndDate,cardPassword,div);
  res.status(201).send("ok");
  
}));

// 계좌 삭제
router.delete('/', wrapper(async function (req, res) {
  const userID = req.userID;
  const rb = req.body;
  const paymentIndex = rb.paymentIndex;

  db.deletePayment(paymentIndex,userID);
  res.status(205).send("ok");
  
}));

module.exports = router;
