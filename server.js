// import express, { static } from 'express';
// import { join } from 'path';
// import cors from 'cors';
// const app = express();
const express = require('express'),
      app     = express(),
      path    = require('path'),
      cors    = require('cors'),
      Port    = process.env.Port || 8080,
      bodyParser = require('body-parser');


express((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-type,' +
    'Accept');
    next;
});
const tt = 'dist/tasc-assmt-tedrob/index.html/'
express(() => {
  console.log('testing', `${tt}`);
})
  .use(express.static(path.join(__dirname, 'favicon.ico')))
  .use(bodyParser.urlencoded({
    extended: true
  }))
  .use(bodyParser.json({
    type: 'application/json'
  }))
  .get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/tasc-assmt-tedrob/index.html'))
  })
  .use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  })
  .listen(Port, () => {
    console.log(`listening on ${Port} test ${tt}`);
  })

// app.use(cors());
// // Serve only the static files form the dist directory
// app.use(static(__dirname + '/dist/tasc-assmt-tedrob'));

// app.get('/*', function (req, res) {

//   res.sendFile(join(__dirname + '/dist/tasc-assmt-tedrob/index.html'));
// });

// // Start the app by listening on the default Heroku port
// app.listen(process.env.PORT || 8080);
