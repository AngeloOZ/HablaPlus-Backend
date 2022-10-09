const { Router } = require('express');
const { uploadImage, uploadAudio, updateUploadAudio, updateUploadImage } = require('../controllers/file.controller');
const { uploadFiles, uploadFilesAudio } = require('../middlewares/multer');

const router = Router();

router.post('/image/category', uploadFiles('image/category'), uploadImage);
router.post('/image/word', uploadFiles('image/word'), uploadImage);

router.post('/image/category/:lastFile', uploadFiles('image/category'), updateUploadImage);
router.post('/image/word/:lastFile', uploadFiles('image/word'), updateUploadImage);

router.post('/audio', uploadFilesAudio(), uploadAudio);
router.post('/audio/:lastFile', uploadFilesAudio(), updateUploadAudio);


module.exports = router;