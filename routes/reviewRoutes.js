const express = require('express');
const reviewcontroller = require('../controllers/reviewController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(reviewcontroller.getAllReviews)
  .post(
    authController.protect,
    authController.restrictTo('user'),
    reviewcontroller.createReview
  );

module.exports = router;
