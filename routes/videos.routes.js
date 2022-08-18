const { Router } = require('express');
const { getVideos, getVideoById, insertVideo, updateVideo, deleteVideo } = require('../controllers/videos.controller');
const { validateInsertVideo, validateIdVideo } = require('../validators/video.validator');

const router = Router();

router.get('/', getVideos)
router.get('/cliente', getVideos)
router.get('/:id', validateIdVideo, getVideoById);
router.post('/', validateInsertVideo, insertVideo);
router.put('/', validateInsertVideo, updateVideo);
router.delete('/:id', validateIdVideo, deleteVideo);

module.exports = router;