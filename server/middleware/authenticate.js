const jwt = require('jsonwebtoken');
const User = require('../model/userSchema');

const authenticate = async (req, res, next) => {
    try {
        //console.log("middleware");
        const token = req.cookies.webcookie;
        //const { authorization } = req.headers
        //authorization === Bearer ewefwegwrherhe
        // if (!authorization) {
        //     return res.status(401).json({ error: "you must be logged in" })
        // }
        //const token = authorization.replace("Bearer ", "")
        const veriyToken = jwt.verify(token, process.env.SECRET_KEY);
        const rootUser = await User.findOne({ _id: veriyToken._id, "tokens.token": token });
        if (!rootUser) {
            throw new Error('User not found');
        }
        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;

        next();
    } catch (err) {
        res.status(401).send('Unauthorized: No token found');
        console.log(err);
    }
}
module.exports = authenticate;