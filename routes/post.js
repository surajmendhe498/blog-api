const express= require('express');
const { addPost, getPosts, deletePost } = require('../controllers/post.controller');
const router= express.Router();

router.post('/add', addPost);
router.get('/:userId', getPosts);
router.delete('/:postId', deletePost);

module.exports= router;