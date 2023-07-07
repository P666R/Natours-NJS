const express = require('express');
const bookingcontroller = require('../controllers/bookingController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get(
  '/checkout-session/:tourId',
  authController.protect,
  bookingcontroller.getCheckoutSession
);

module.exports = router;
