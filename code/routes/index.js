import express from 'express';
import cors from 'cors';
import {
  getPostsUserLiked
} from '../controllers/questionnaireController.js';
const router = express.Router();

// routes
router.get('/', (req, res, next) => {
  res.json('Hi, this is a microservice for my internship test assignment');
});

router.get('/posts/likedby/:user_id', cors(), getPostsUserLiked);

export default router;
