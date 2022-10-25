const { request, response } = require('express');
const { deleteFiles } = require('../helpers/deleteFiles');

const uploadImage = (req = request, res = response) => {
   try {
      const fileName = req.file.filename;
      const destination = req.file.destination.slice(9);
      res.status(201).json({ url: `${destination}/${fileName}` });
   } catch (error) {
      res.status(404).json({ status: 404, message: error.message });
   }
}

const updateUploadImage = (req = request, res = response) => {
   try {
      const { lastFile } = req.params;
      deleteFiles(atob(lastFile));
      const fileName = req.file.filename;
      const destination = req.file.destination.slice(9);
      res.status(201).json({ url: `${destination}/${fileName}` });
   } catch (error) {
      res.status(404).json({ status: 404, message: error.message })
   }
}

const uploadAudio = (req = request, res = response) => {
   try {
      const fileName = req.file?.filename;
      const destination = req.file?.destination.slice(9);
      res.status(201).json({ url: `${destination}/${fileName}` });
   } catch (error) {
      res.status(404).json({ status: 404, message: error.message });
   }
}

const updateUploadAudio = (req = request, res = response) => {
   try {
      const { lastFile } = req.params;
      deleteFiles(atob(lastFile));
      const fileName = req.file?.filename;
      const destination = req.file?.destination.slice(9);
      res.status(201).json({ url: `${destination}/${fileName}`, state: 201 });
   } catch (error) {
      res.status(404).json({ status: 404, message: error.message })
   }
}


module.exports = { uploadImage, uploadAudio, updateUploadImage, updateUploadAudio };