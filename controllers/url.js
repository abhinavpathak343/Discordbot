import {
    nanoid
} from "nanoid";
import { URL } from "../models/url.js";

export const handlegenerateNEWShortURL = async (req, res) => {
    const body = req.body;

    if (!body.url) {
        return res.status(400).json({
            error: "URL is required"
        });
    }

    const shortID = nanoid(8);

    try {
        await URL.create({
            shortId: shortID,
            redirectURL: body.url,
            visitHistory: [],
        });

        return res.status(201).json({
            id: shortID
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

    const entry = await URL.findOneAndUpdate({
        shortId
    }, {
        $push: {
            visitHistory: {
                timestamp: Date.now()
            }
        }
    }, {
        new: true
    });

    if (!entry) {
        return res.status(404).send('Short URL not found');
    }

    res.redirect(entry.redirectURL);
};


export const handleGetAnalytics=async(req, res)=>{
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });
    return res.json({
        totalclicks: result.visitHistory.length,
        analytics: result.visitHistory,
    });
}