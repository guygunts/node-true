const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const indexRouter = require('./routes/index');
const pathdev=require('dotenv').config({ path: './config/dev.env' });
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function( req, res, next) 
{
  // set locals, only providing error in development
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods",'POST, GET, PUT, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, Content-Length, X-Requested-With, cache-control, sysuid");
  next();
});

global.appRoot = path.resolve(__dirname);
app.use(indexRouter);
const PORT = pathdev.parsed.app_port;
app.listen(PORT,() => {
  console.log(`server running on port  ${PORT}`);

});
module.exports = app;

