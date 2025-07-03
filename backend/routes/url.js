import express from 'express';
const router = express.Router();

import {
    handlegenerateNEWShortURL,
    handleGenerateQRCode,
    handleRedirectURL
} from '../controllers/url.js';

router.post("/", handlegenerateNEWShortURL);
router.post("/qr", handleGenerateQRCode);
//router.get('/:shortId', handleRedirectURL);

export default router;