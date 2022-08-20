const { Router } = require('express');
const validateToken = require('../middlewares/verifyToken');
const checkRols = require('../middlewares/validateRol');
const { validateInsertVideo, validateIdVideo } = require('../validators/video.validator');

const { getVideos, getVideoById, insertVideo, updateVideo, deleteVideo } = require('../controllers/videos.controller');

const router = Router();

router.get('/', validateToken, getVideos)
router.get('/cliente', getVideos)
router.get('/:id', validateToken, validateIdVideo, getVideoById);
router.post('/', validateToken, checkRols([1, 2]), validateInsertVideo, insertVideo);
router.put('/', validateToken, validateInsertVideo, updateVideo);
router.delete('/:id', validateToken, validateIdVideo, deleteVideo);

module.exports = router;