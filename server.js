const express = require('express');
const cors = require('cors');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();
express((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-type,' +
    'Accept');
  next;
});
app.use(cors());
app.use(express.static(path.join(__dirname, 'dist/tasc-assmt-tedrob/index.html')));
app.use(express.static(path.join(__dirname, 'dist/tasc-assmt-tedrob/favicon.ico')));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist/tasc-assmt-tedrob/index.html'));
});

app.listen(port, cors(), () => {
  console.log(`listening on ${port}`);
})
