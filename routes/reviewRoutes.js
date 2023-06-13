const express = require('express');
const reviewcontroller = require('../controllers/reviewController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router
  .route('/')
  .get(reviewcontroller.getAllReviews)
  .post(
    authController.restrictTo('user'),
    reviewcontroller.setTourUserIds,
    reviewcontroller.createReview
  );

router
  .route('/:id')
  .get(reviewcontroller.getReview)
  .patch(
    authController.restrictTo('user', 'admin'),
    reviewcontroller.updateReview
  )
  .delete(
    authController.restrictTo('user', 'admin'),
    reviewcontroller.deleteReview
  );

module.exports = router;
