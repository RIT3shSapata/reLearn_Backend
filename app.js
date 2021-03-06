const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const expressValidator = require('express-validator');
require('dotenv').config();
//import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const profileRoutes = require('./routes/profile');
const codeRoutes = require('./routes/code');

const app = express();

//database
mongoose
  .connect(process.env.DATABASE, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => console.log('DATABASE CONNECTED'))
  .catch((error) => console.log(error));

//middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

//routes middleware
app.use(authRoutes); //use app.use("/api", authRoutes) to get deault "/api" in URL, example localhost:3000/api/signin, etc
app.use(profileRoutes);
app.use(codeRoutes);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server is running on Port ${port}`);
});
