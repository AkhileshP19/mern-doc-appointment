const express = require('express');
const colors = require('colors');
const morgan = require('morgan');
const dotenv = require('dotenv');

// config env
dotenv.config();

// express app
const app = express();

// middlewares
app.use(express.json());
app.use(morgan('dev'));

// routes
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'server running'
    })
})

// listen on port
const port = process.env.port || 8080;
app.listen(port, () => {
    console.log(`server running in ${process.env.NODE_MODE} mode on port ${port}`);
    
})