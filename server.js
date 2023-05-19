const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

// const DB = process.env.DATABASE_LOCAL;

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await mongoose
      .connect(DB)
      .then(() => console.log('DB connection successful'));

    app.listen(port, () => console.log(`app running on port ${port}...`));
  } catch (err) {
    console.log(err.name, err.message);
  }
};

start();

/*
async function dbConnect() {
  await mongoose.connect(DB);
}

dbConnect()
  .then(() => console.log('DB connection successful'))
  .catch((err) => console.log(err.name, err.message));

const server = app.listen(port, () =>
  console.log(`app running on port ${port}...`)
);

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', promise, 'reason:', reason);
  console.log('Shutting down...');
  server.close(() => {
    process.exit(1);
  });
});
*/
