const fs = require('fs');
const express = require('express');

const app = express();

app.use(express.json());

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

app.get('/api/v1/tours/:id', (req, res) => {
  // console.log(req.params);

  // const id = req.params.id * 1; 123abc -> NaN
  // const id = +req.params.id; 123abc -> NaN
  const id = parseInt(req.params.id); // 123abc -> 123

  /*
  if (id >= tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'invalid id',
    });
  }
  */

  const tour = tours.find((tour) => tour.id === id);

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'invalid id',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
});

app.post('/api/v1/tours', (req, res) => {
  // console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
});

const port = 3000;
app.listen(port, () => {
  console.log(`app running on port ${port}...`);
});
