import express from 'express';
const router = express.Router(); 

import {
    handlegenerateNEWShortURL,
    handleGetAnalytics
} from '../controllers/url.js'; 
import {
    handleRedirectURL
}
from '../controllers/url.js';

router.post("/", handlegenerateNEWShortURL);
router.get('/:shortId', handleRedirectURL);
router.get('/analytics/:shortId', handleGetAnalytics);

export default router;
