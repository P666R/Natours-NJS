const fs = require('fs');
const express = require('express');

const app = express();

/*
app.get('/', (req, res) => {
  //   res.status(200).send('hello from  the server side !');
  res
    .status(200)
    .json({ message: 'hello from  the server side !', app: 'natours' });
});

app.post('/', (req, res) => {
  res.send('you can post to this endpoint !');
});
*/

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    // jSend data specification
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`app running on port ${port}...`);
});
