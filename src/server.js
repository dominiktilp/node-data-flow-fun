import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';

import listsRouter from './list.js';
import usersRouter from './user.js';

let port = process.env.PORT || 8888;

let app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

function supportCrossOriginScript(req, res, next) {
  res.status(200);
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  next();
}
app.use(supportCrossOriginScript);
app.options('*', supportCrossOriginScript);

app.use('/api/lists', listsRouter);
app.use('/api/users', usersRouter);


app.listen(port);
console.log('Magic happens on port ' + port);
