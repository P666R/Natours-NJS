/* eslint-disable */

import { loadStripe } from '@stripe/stripe-js';
import { showAlert } from './alerts.js';

export const bookTour = async (tourId) => {
  const stripe = await loadStripe(
    'pk_test_51NQvQySF6mpxAUwXdZ5Ya8A8JhRvlP2uLmOskGN8HnSz7eAXZWfowfoZYCAw54nKHTYiSYDDaAyF9yjak6HMWvb800ibsH43UV'
  );

  try {
    // 1. get checkout session from api
    const session = await axios(
      `http://localhost:8000/api/v1/bookings/checkout-session/${tourId}`
    );

    // console.log(session);

    // 2. create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
