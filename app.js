const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require("dotenv").config();

const { printToJson } = require('./helpers/printJson');
const { sequelize } = require('./models/database');

const app = express();
const port = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// prueba ssh

// app.use((req, res) => {
   // res.status(300).redirect('/api');
   // res.status(404).json(printToJson(404, "Bad request"));
// });

app.get('/api', (req, res) => {
   res.status(404).json(printToJson(404, "Bad request"));
});

app.use('/api/video', require("./routes/videos.routes"));

app.listen(port, async () => {
   try {
      await sequelize.sync({ force: false });
      console.log(`Application is listening at port ${port}`);
   } catch (error) {
      
   }
});
