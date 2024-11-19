const express = require('express');
const colors = require('colors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');


// config env
dotenv.config();


// mongodb connection
connectDB();

// express app
const app = express();

// middlewares
app.use(express.json());
app.use(morgan('dev'));

// Allow dynamic Gitpod URLs
const corsOptions = {
  origin: [
    'https://5173-akhileshp19-merndocappo-ydgtrjbvv97.ws-us116.gitpod.io', // Frontend origin
  ],
  credentials: true, // Allow cookies or credentials if needed
};

app.use(cors(corsOptions));

// routes
app.use('/api/v1/user', require('./routes/userRoutes'));



// listen on port
const port = process.env.port || 8080;
app.listen(port, () => {
    console.log(`server running in ${process.env.NODE_MODE} mode on port ${port}`.bgCyan.white);
})

