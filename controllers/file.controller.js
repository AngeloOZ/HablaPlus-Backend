const { request, response } = require('express');
const { printToJson } = require('../helpers/printJson');


const uploadImage = (req = request, res = response) => {
   const fileName = req.file.filename;
   const destination = req.file.destination.slice(9);
   res.send(`${process.env.URL_BASE}${destination}/${fileName}`);
}

module.exports = uploadImage;