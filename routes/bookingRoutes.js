const express = require('express');
const bookingcontroller = require('../controllers/bookingController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router.get('/checkout-session/:tourId', bookingcontroller.getCheckoutSession);

router.use(authController.restrictTo('admin', 'lead-guide'));

router
  .route('/')
  .get(bookingcontroller.getAllBookings)
  .post(bookingcontroller.createBooking);

router
  .route('/:id')
  .get(bookingcontroller.getBooking)
  .patch(bookingcontroller.updateBooking)
  .delete(bookingcontroller.deleteBooking);

module.exports = router;
