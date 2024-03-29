const express = require('express');
const path = require('path');
const cors = require('cors')
const cookieParser = require('cookie-parser');

const fs = require('fs');
require("dotenv").config();

const { printToJson } = require('./helpers/printJson');
const { sequelize } = require('./models/database');
const validateToken = require('./middlewares/verifyToken');
const { Avatar } = require('./models/Avatar');


const app = express();
const port = process.env.PORT || 4010;

/* -------------------------------------------------------------------------- */
/*                          Funciones de middlewares                          */
/* -------------------------------------------------------------------------- */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

/* -------------------------------------------------------------------------- */
/*                                    Ruteo                                   */
/* -------------------------------------------------------------------------- */
app.get('/api', (req, res) => {
   res.status(404).json(printToJson(404, "Bad request"));
});

app.use('/api/video', validateToken, require("./routes/videos.routes"));
app.use('/api/category', require("./routes/category.routes"));
app.use('/api/word', require("./routes/word.routes"));
app.use('/api/user', require("./routes/user.routes"));
app.use('/api/auth', require("./routes/auth.routes"));
app.use('/api/rol', require("./routes/typeUser.routes"));
app.use('/api/file', require("./routes/file.routes"));
app.use('/api/word_learned', require("./routes/wordLearned.routes"));
app.use('/api/sentences', require("./routes/sentences.routes"));
app.use('/api/avatar', require("./routes/avatar.routes"));

/* -------------------------------------------------------------------------- */
/*                        Manejo de errores y servidor                        */
/* -------------------------------------------------------------------------- */
app.use(function (req, res, next) {
   res.status(404).json(printToJson(404, `the url ${req.url} no found`))
});
app.listen(port, async () => {
   try {
      await sequelize.authenticate();
      console.log(`Application is listening at port ${port}`);
      // await sequelize.sync({ alter: true });
   } catch (err) {
      console.error(err)
   }
});
