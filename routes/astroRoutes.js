import express from 'express';
import { askQuestion, getQuestionHistory } from '../controllers/astroController.js';
import { protectRoute } from '../middlewares/protectRoute.js';

const router = express.Router();

router.post('/ask',protectRoute, askQuestion);
router.get('/history', protectRoute,getQuestionHistory);

export default router;