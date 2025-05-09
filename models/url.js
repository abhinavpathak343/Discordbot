import mongoose from 'mongoose';
const urlschema = new mongoose.Schema({
    shortId: {
        type: String,
        reqiured: true,
        unique: true
    },
    redirectURL: {
        type: String,
        required: true
    },

    visitHistory: [{
        timestamp: {
            type:Date
        }
    }],
},
{
    timestamp:true
}


);

export const URL = mongoose.model('url', urlschema);