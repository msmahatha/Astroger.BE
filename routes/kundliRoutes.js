import express from 'express';
import { generateKundli } from '../controllers/kundliController.js';
import { protectRoute } from '../middlewares/protectRoute.js';

const router = express.Router();

router.post('/generate',protectRoute, generateKundli);


export default router;