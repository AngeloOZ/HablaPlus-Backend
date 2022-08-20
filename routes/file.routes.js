const { Router } = require('express');
const uploadImage = require('../controllers/file.controller');
const uploadFiles = require('../middlewares/multer');

const router = Router();

router.post('/image/category', uploadFiles('image/category'), uploadImage);
// router.post('/image/word', uploadFiles('image/word'), uploadImage);
router.post('/audio', uploadFiles('/audio'), uploadImage);


module.exports = router;