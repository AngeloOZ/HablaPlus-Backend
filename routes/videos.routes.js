const { Router } = require('express');
const { getVideos, getVideoById } = require('../controllers/videos.controller');

const router = Router();

router.get('/', getVideos)
router.get('/:id', getVideoById);
router.post('/');
router.put('/');
router.delete('/:id');

module.exports = router;

// router.get('/', (req, res) => {
//    res.send('lista de videos')
// })
// router.get('/:id');
// router.post('/');
// router.put('/');
// router.delete('/');