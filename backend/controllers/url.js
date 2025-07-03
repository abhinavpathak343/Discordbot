import {
    nanoid
} from "nanoid";

import QRCode from 'qrcode';
import {
    URL
} from "../models/url.js";

export const handlegenerateNEWShortURL = async (req, res) => {
    const body = req.body;

    if (!body.url) {
        return res.status(400).json({
            error: "URL is required"
        });
    }

    const shortID = nanoid(8);
    // Use backend's own host and protocol as base
    const shortUrl = `${req.protocol}://${req.get('host')}/${shortID}`;

    try {
        await URL.create({
            shortId: shortID,
            redirectURL: body.url,
            visitHistory: [],
        });
        return res.status(201).json({
            id: shortID,
            shortUrl
        });
    } catch (err) {
        console.error("Error creating short URL:", err);
        return res.status(500).json({
            error: "Internal server error"
        });
    }
};

export const handleRedirectURL = async (req, res) => {
    const shortId = req.params.shortId;
    try {
        const entry = await URL.findOne({
            shortId
        });
        if (!entry) {
            return res.status(404).send('Short URL not found');
        }
        res.redirect(entry.redirectURL);
    } catch (err) {
        console.error('Error during redirect:', err);
        return res.status(500).send('Internal server error');
    }
};

export const handleGenerateQRCode = async (req, res) => {
    const {
        text,
        options
    } = req.body;
    if (!text) {
        return res.status(400).json({
            error: 'Text is required to generate QR code'
        });
    }
    try {
        const qr = await QRCode.toDataURL(text, options || {});
        return res.status(200).json({
            qrCode: qr
        });
    } catch (err) {
        console.error('Error generating QR code:', err);
        return res.status(500).json({
            error: 'Failed to generate QR code'
        });
    }
};