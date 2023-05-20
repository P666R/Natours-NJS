const mongoose = require('mongoose');
const http = require('http');
const dotenv = require('dotenv');

// globally handle any uncaught exceptions
process.on('uncaughtException', (err) => {
  console.log('Uncaught exception! Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

// const DB = process.env.DATABASE_LOCAL;

const port = process.env.PORT || 3000;

const server = http.createServer(app);

const start = async () => {
  try {
    // connecting to DB
    await mongoose
      .connect(DB)
      .then(() => console.log('DB connection successful'));
    // start server
    server.listen(port, () => console.log(`App running on port ${port}...`));
    // catch any error on attempt to connect to DB
  } catch (error) {
    console.log(error.name, error.message);
  }
};

// globally handle any unhandled rejected promises
process.on('unhandledRejection', (err) => {
  console.log('Unhandled rejection! Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

start();
