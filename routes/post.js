const express= require('express');
const { addPost, getPosts } = require('../controllers/post.controller');
const router= express.Router();

router.post('/add', addPost);
router.get('/:userId', getPosts);

module.exports= router;