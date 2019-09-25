const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();

// Serve static files....
app.use(express.static(__dirname + '/dist/tasc-assmt-tedrob'));

// Send all requests to index.html
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/tasc-assmt-tedrob/index.html'));
});

// default Heroku PORT
app.listen(port, () => {
  console.log(`listening on ${port}`);
})
