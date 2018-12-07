const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const app = express();
const morgan = require('morgan');
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');

// Cors setup
exports.corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}

// DB setup
mongoose.connect("mongodb://localhost:auth/auth", {
    useNewUrlParser: true
});

// app setup
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({
    type: '*/*'
}));

router(app);

const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on port: ' + port);