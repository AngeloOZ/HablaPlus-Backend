const { Router } = require('express');
const validateToken = require('../middlewares/verifyToken');
const checkRols = require('../middlewares/validateRol');
const { validateInsertVideo, validateIdVideo, validateIdUniqueVideo } = require('../validators/video.validator');

const { getVideos, getVideoById, insertVideo, updateVideo, deleteVideo, getVideoByUnique } = require('../controllers/videos.controller');

const router = Router();

router.get('/', validateToken, getVideos)
router.get('/cliente', validateToken, getVideos)
router.get('/:id', validateToken, validateIdVideo, getVideoById);
router.get('/unique/:id', validateToken, validateIdUniqueVideo, getVideoByUnique);
router.post('/', validateToken, checkRols([1]), validateInsertVideo, insertVideo);
router.put('/', validateToken, checkRols([1]), validateInsertVideo, updateVideo);
router.delete('/:id', validateToken, checkRols([1]), validateIdVideo, deleteVideo);

module.exports = router;