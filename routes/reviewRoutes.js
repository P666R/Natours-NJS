const express = require('express');
const reviewcontroller = require('../controllers/reviewController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

// POST /tour/23ere4tt4/reviews
// GET /tour/23ere4tt4/reviews
// POST /reviews

router
  .route('/')
  .get(reviewcontroller.getAllReviews)
  .post(
    authController.protect,
    authController.restrictTo('user'),
    reviewcontroller.createReview
  );

module.exports = router;
