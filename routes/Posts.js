import express from 'express';
import { getPostsBySearch, createPost, getPosts, updatePost, deletePost, likePost } from '../controllers/Posts.js'
import auth from "../middleware/auth.js";
const router = express.Router();

router.get('/', getPosts)
router.get('/search', getPostsBySearch)
router.post('/', auth, createPost)
router.patch('/:id', auth, updatePost)
router.delete('/:id', auth, deletePost)
router.patch('/:id/likePost', auth, likePost)


export default router;