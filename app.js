const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const productRoutes = require('./api/routes/products');
// to avoid restarting server.js use node mon
// npm install --save-dev nodemon
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true})); // set to true if need rich data
app.use(bodyParser.json());

// cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // * should only be the client url
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

app.use('/products', productRoutes);

// handle error if route not found
app.use((req, res, next) => {
    const error = new Error('Not found...');
    error.status(404);
    next(error);
});


//throw error from anywhere in the application
app.use((req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});


module.exports = app;