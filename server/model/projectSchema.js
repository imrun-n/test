const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/userSchema');

const projectSchema = new mongoose.Schema({

    ctitle: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true

    },
    ctagline: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    tags: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },


    story: {
        type: String,
        required: true
    },

    amount: {
        type: Number,
        required: true
    },
    rnumber: {
        type: Number,
        required: true
    },
    anumber: {
        type: Number,
        required: true
    },
    raisedamount: {
        type: Number,

    },
    re_anumber: {
        type: Number,
        required: true
    },
    faqList: [
        {
            question: {
                type: String,
                required: true

            },
            answer: {
                type: String,
                required: true

            }
        }
    ],
    postedBy: {
        type: ObjectId,
        ref: "USER"
    },
    startdate: {
        type: Date,
        required: true

    },
    expiredate: {
        type: Date,
        required: true

    },
    url: {
        type: String,
        required: true
    }
    ,
    backed: [
        {
            backer: {
                type: ObjectId,
                ref: "USER"
            }
        }

    ],
    comments: [{
        text: String,
        postedBy: {
            type: ObjectId,
            ref: "USER"
        }
    }]



});



const Project = mongoose.model('PROJECT', projectSchema);
module.exports = Project;