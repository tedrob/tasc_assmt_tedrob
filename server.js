import express, { static } from 'express';
import { join } from 'path';
import cors from 'cors';
const app = express();

app.use(cors());
// Serve only the static files form the dist directory
app.use(static(__dirname + '/dist/tasc-assmt-tedrob'));

app.get('/*', function (req, res) {

  res.sendFile(join(__dirname + '/dist/tasc-assmt-tedrob/index.html}}'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
