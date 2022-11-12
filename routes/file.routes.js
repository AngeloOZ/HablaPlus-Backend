const { Router } = require('express');
const { uploadImage, uploadAudio, updateUploadAudio, updateUploadImage } = require('../controllers/file.controller');
const { uploadFiles, uploadFilesAudio } = require('../middlewares/multer');
const checkRols = require('../middlewares/validateRol');
const validateToken = require('../middlewares/verifyToken');

const router = Router();

router.post('/image/category', validateToken, checkRols([1]), uploadFiles('image/category'), uploadImage);
router.post('/image/word', validateToken, checkRols([1]), uploadFiles('image/word'), uploadImage);

router.post('/image/category/:lastFile', validateToken, checkRols([1]), uploadFiles('image/category'), updateUploadImage);
router.post('/image/word/:lastFile', validateToken, checkRols([1]), uploadFiles('image/word'), updateUploadImage);

router.post('/audio', validateToken, checkRols([1]), uploadFilesAudio(), uploadAudio);
router.post('/audio/:lastFile', validateToken, checkRols([1]), uploadFilesAudio(), updateUploadAudio);


module.exports = router;