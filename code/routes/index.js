import express from 'express';
import cors from 'cors';
import {
  getPostsUserLiked,
  getTotalLikesOfPost,
  addNewPost
} from '../controllers/postsController.js';
const router = express.Router();

// routes
router.get('/', (req, res, next) => {
  res.json('Hi, this is a microservice for my internship test assignment');
});

router.get('/posts/likedby/:user_id', cors(), getPostsUserLiked);
router.get('/posts/:blog_id/totallikes', cors(), getTotalLikesOfPost);
router.post('/posts', cors(), addNewPost);

export default router;
