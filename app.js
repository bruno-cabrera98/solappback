var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const cors = require('cors')

const proxyRouter = require('./routes/proxy')

var app = express();

app.use(process.env.DIR, express.static('build'));
app.use(cors())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

app.use(process.env.DIR, proxyRouter);

app.get(process.env.DIR + '*', function(req, res) {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

module.exports = app;
