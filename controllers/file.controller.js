const { request, response } = require('express');

const uploadImage = (req = request, res = response) => {
   const fileName = req.file.filename;
   const destination = req.file.destination.slice(9);
   res.status(201).json({ url: `${process.env.URL_BASE}${destination}/${fileName}`});
}

const uploadAudio = (req = request, res = response) => {
   const fileName = req.file?.filename;
   const destination = req.file?.destination.slice(9);
   console.log(destination);
   res.status(201).json({ url: `${process.env.URL_BASE}${destination}/${fileName}`});
}

module.exports = { uploadImage, uploadAudio };