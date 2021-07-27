const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const bcryptjs = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true

    },
    phone: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    },
    resetToken: String,
    expireToken: Date,

    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }

    ]
})



userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
        this.cpassword = await bcrypt.hash(this.cpassword, 12);
        console.log('encryption ');
    }
    next();

});

userSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;



    } catch (err) {
        console.log(err);
    }
}
userSchema.methods.generateresetToken = async function () {
    try {


        let token1 = jwt.sign({ email: this.email }, process.env.SECRET_KEY);
        this.resetToken = token1;
        this.expireToken = Date.now() + 3600000;
        await this.save();
        return token1;



    } catch (err) {
        console.log(err);
    }
}

const User = mongoose.model('USER', userSchema);
module.exports = User;