const { Router } = require('express');
const { uploadImage, uploadAudio } = require('../controllers/file.controller');
const { uploadFiles, uploadFilesAudio } = require('../middlewares/multer');

const router = Router();

router.post('/image/category', uploadFiles('image/category'), uploadImage);
router.post('/image/word', uploadFiles('image/word'), uploadImage);
router.post('/audio', uploadFilesAudio(), uploadAudio);


module.exports = router;