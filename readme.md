<h1 align="center">
# Natours - Tour Booking Site
</h1>

# Deployed Version: https://natours-i5ww.onrender.com

## Key Features

- Authentication and Authorization
  - Login and logout
- Tour
  - Manage booking, check tours map, check users' reviews and rating
- User profile
  - Update username, photo, email, and password
- Credit card Payment

### Design model: MVC

1. Model folder is data-model of the business entities: `user`, `review`, `tour`, `booking`

2. Controller folder is the business layer used to process logic of the application

3. Views folder is the presentation layer used to render the UI interface to user.

4. Routes folder is the routing of the rest-api services.

5. Public folder is the folder containing static files as HTML/css/image files. It is used to integrated with the `views` folder.

### Book a tour

- Login to the site
- Search for tours that you want to book
- Book a tour
- Proceed to the payment checkout page
- Enter the card details (Test Mode):

  ```
  - Card No. : 4242 4242 4242 4242
  - Expiry date: 02 / 25
  - CVV: 123
  ```

### Manage your booking

- Check the tour you have booked in "Manage Booking" page in your user settings. You'll be automatically redirected to this
  page after you have completed the booking.

### Update your profile

- You can update your own username, profile photo, email and password.

### API Usage

Before using the API, you need to set the variables in Postman depending on your environment (development or production). Simply add:

```
- {{URL}} with your hostname as value (Eg. http://localhost:8000 or http://www.example.com)
- {{password}} with your user password as value.
```

Check [Natours API Documentation](https://documenter.getpostman.com/view/8689170/SVmzvwpY?version=latest) for more info.

<b> API Features: </b>

Tours List 👉 https://natours-i5ww.onrender.com/api/v1/tours

Tours State 👉 https://natours-i5ww.onrender.com/api/v1/tours/tour-stats

Get Top 5 Cheap Tours 👉 https://natours-i5ww.onrender.com/api/v1/tours/top-5-cheap

Get Tours Within Radius 👉 https://natours-i5ww.onrender.com/api/v1/tours/tours-within/150/center/34.098453,-118.096327/unit/mi

### Build With

- [NodeJS](https://nodejs.org/en/) - JS runtime environment
- [Express](http://expressjs.com/) - The web framework used
- [Mongoose](https://mongoosejs.com/) - Object Data Modelling (ODM) library
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - Cloud database service
- [Pug](https://pugjs.org/api/getting-started.html) - High performance template engine
- [JSON Web Token](https://jwt.io/) - Security token
- [ParcelJS](https://parceljs.org/) - Fast, zero configuration web application bundler
- [Stripe](https://stripe.com/) - Online payment API
- [Postman](https://www.getpostman.com/) - API testing
- [Mailtrap](https://mailtrap.io/) & [Sendgrid](https://sendgrid.com/) - Email delivery platform
- [Render](https://render.com/) - Cloud platform

### Installation

You can fork the app or you can git-clone the app into your local machine. Once done that, please install all the
dependencies by running

```
$ npm i
set up environment variables
    * DATABASE=your mongodb database url
    * DATABASE_PASSWORD=your mongodb password

    * SECRET=your json web token secret
    * JWT_EXPIRES_IN=90d
    * JWT_COOKIE_EXPIRES_IN=90

    * EMAIL_USERNAME=your mailtrap username
    * EMAIL_PASSWORD=your mailtrap password
    * EMAIL_HOST=smtp.mailtrap.io
    * EMAIL_PORT=2525
    * EMAIL_FROM=your real life email address

    * SENDGRID_USERNAME=apikey
    * SENDGRID_PASSWORD=your sendgrid password

    * STRIPE_SECRET_KEY=your stripe secret key
    * STRIPE_WEBHOOK_SECRET=your stripe web hook secret

$ npm run watch:js
$ npm run build:js
$ npm run dev (for development)
$ npm run start:prod (for production)
$ npm run debug (for debug)
$ npm start

```

### Future Updates

- Review and rating: Allow user to add a review directly at the website after they have taken a tour
- Booking: Prevent duplicate bookings after user has booked that exact tour, implement favourite tours
- Advanced authentication features: Signup, confirm user email, login with refresh token, two-factor authentication
- Improve overall UX/UI and fix bugs
- Featured Tours
- Recently Viewed Tours
- And More...
