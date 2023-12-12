const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const routes = require('../core/routes');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4200;

app.use(
  cors({
    origin: '*',
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
routes(app);

mongoose.connect(
  process.env.MONGODB_URI ||
    'mongodb://localhost:27017/assignment',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Connected to MongoDB');
    }
  }
);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
