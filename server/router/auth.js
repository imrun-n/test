const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();
require('../db/connection')
const User = require("../model/userSchema")
const Project = require("../model/projectSchema");
const authenticate = require("../middleware/authenticate");
const cookieparser = require('cookie-parser');
const validator = require('validator');
const nodemailer = require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport')



const transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: "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"
    }
}))




router.get('/', (req, res) => {
    res.send('Hello World from router')
});






// router.post('/register', (req, res) => {

//     const { name, email, phone, password, cpassword } = req.body;
//     if (!name || !email || !phone || !password || !cpassword) {
//         return res.status(422).send({ error: "plz fill the form correctly" });
//     }
//     User.findOne({ email: email }).then((userExist) => {
//         if (userExist) {
//             return res.status(422).send({ error: "Email already exist" });
//         }
//         const user = new User({ name, email, phone, password, cpassword });
//         user.save().then(() => {

//             res.status(201).send({ message: "Resisterd successfuly" })
//         }).catch((err) => { res.status(500).send({ error: "failed to registered" }) });

//     }).catch((err) => { console.log(err) });
//     //res.send('Hello World from router')
// });


router.post('/register', async (req, res) => {
    var regix = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()+=-\?;,./{}|\":<>\[\]\\\' ~_]).{8,20}/;


    const { name, email, phone, password, cpassword } = req.body;
    if (!name || !email || !phone || !password || !cpassword) {
        return res.status(422).send({ error: "plz fill the form correctly" });
    }

    try {
        if (!regix.test(password)) {
            return res.status(422).send({
                error: "Password :At least one uppercase , one lowercase , one digit ,one special character and length 8 to 20 "
            });

        }


        if (!validator.isEmail(email)) {
            return res.status(422).send({ error: "Invalid Email" });
        }

        const userExist = await User.findOne({ email: email });
        if (userExist) {
            return res.status(422).send({ error: "Email already exist" });
        }

        const user = new User({ name, email, phone, password, cpassword });
        //const userRegister =
        await user.save();
        // if (userRegister) {

        //     res.status(201).send({ message: "Resisterd successfuly" })
        // }
        // else {
        //     res.status(500).send({ error: " failed to register" });
        // }

        transporter.sendMail({
            to: email,
            from: "halumcheck@gmail.com",
            subject: "signup success",
            html: "<h1>welcome to crowdfunding</h1>"
        })

        return res.status(201).send({ message: "Resisterd successfuly" });



    } catch (err) {
        console.log(err);

    }

    //res.send('Hello World from router')
});


router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send({ error: "please fill the data" });

        }
        const userLogin = await User.findOne({ email: email });
        console.log(userLogin);
        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);
            const token = await userLogin.generateAuthToken();
            console.log(token);
            res.cookie("webcookie", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true
            });
            if (isMatch) {
                return res.send({ token: token });
                //return res.send({ message:Login successful});

            }
            else {
                return res.status(400).send({ error: "user error pass" });

            }

        } else {
            return res.status(400).send({ error: "user error" });

        }


    } catch (err) {
        console.log(err);
    }
});

router.use(cookieparser());

router.get('/what-we-do', authenticate, (req, res) => {
    //console.log("hello my about ");
    res.send(req.rootUser);
    //     res.send('Hello World') router.use(cookieparser);
});


router.get('/checklogin', authenticate, (req, res) => {
    //console.log("hello my about ");
    // res.send(req.rootUser);
    //     res.send('Hello World') router.use(cookieparser);
});

router.get('/logout', (req, res) => {

    res.clearCookie('webcookie', { path: '/' });
    res.status(200).send('user logout');

});

router.post('/reset-pass', async (req, res) => {
    const { email } = req.body;


    try {
        if (!email) {
            return res.status(422).send({ error: "plz fill the form correctly" });
        }
        const userExist = await User.findOne({ email: email });
        if (!userExist) {
            return res.status(422).send({ error: "Email doesn't exist" });
        }
        const token = await userExist.generateresetToken();
        transporter.sendMail({
            to: email,
            from: "halumcheck@gmail.com",
            subject: "password reset",
            html: `
                     <p>You requested for password reset</p>
                     <h5>click in this <a href="http://localhost:3000/new-password/${token}">link</a> to reset password</h5>
                     `
        });
        res.json({ message: "check your email" });


    } catch (err) {
        console.log(err);
    }

});


router.post('/new-password', async (req, res) => {
    var regix = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()+=-\?;,./{}|\":<>\[\]\\\' ~_]).{8,20}/;


    const { password, cpassword, token } = req.body;
    if (!password || !cpassword) {
        return res.status(422).send({ error: "plz fill the form correctly" });
    }

    try {
        if (!regix.test(password)) {
            return res.status(422).send({
                error: "Password :At least one uppercase , one lowercase , one digit ,one special character and length 8 to 20 "
            });

        }




        const userExist = await User.findOne({ resetToken: token, expireToken: { $gt: Date.now() } });
        if (!userExist) {
            return res.status(422).send({ error: "resetlink expired" });
        }

        userExist.password = password;
        userExist.cpassword = cpassword;
        userExist.resetToken = undefined;
        userExist.expireToken = undefined;

        const usersave = await userExist.save();



        return res.status(201).send({ message: "Reset password successful" });



    } catch (err) {
        console.log(err);

    }


});

// PROJECTS RELATED REQUEST

router.post('/createproject', authenticate, async (req, res) => {

    const { ctitle, category, ctagline, location, tags, duration, story, amount, rnumber, anumber, re_anumber, faqList, startdate, expiredate, url } = req.body;
    try {

        if (!ctitle || !category || !ctagline || !location || !tags || !duration || !story || !amount || !rnumber || !anumber || !re_anumber || !faqList || !startdate || !expiredate || !url) {
            return res.status(422).send({ error: "plz fill the form correctly" });
        }

        const project = new Project({
            ctitle, category, ctagline, location, tags, duration, story, amount, rnumber, anumber, re_anumber, faqList,
            postedBy: req.rootUser, startdate, expiredate, url
        });
        //const userRegister =
        savedProject = await project.save();

        //return res.status(201).send({ message: Project created });
        return res.status(201).send({ message: savedProject });



    } catch (err) {
        console.log(err);

    }

    //res.send('Hello World from router')
});

router.get('/allproject', async (req, res) => {
    //console.log("hello my about ");
    //res.send(req.rootUser);
    //     res.send('Hello World') router.use(cookieparser);
    try {
        const allProject = await Project.find().populate("postedBy", "_id name");
        console.log(allProject);
        return res.status(201).send({ project: allProject });

    } catch (err) {
        console.log(err);
        res.status(401).send('can not fetch');
    }
});

router.get('/myproject', authenticate, async (req, res) => {
    //console.log("hello my about ");
    //res.send(req.rootUser);
    //     res.send('Hello World') router.use(cookieparser);
    try {
        const myProject = await Project.find({ postedBy: req.userID }).populate("postedBy", "_id name");
        console.log(myProject);
        return res.status(201).send({ message: myProject });

    } catch (err) {
        console.log(err)
    }
});


// router.get('/projectdetails/:id', async (req, res) => {
//     try {

//         const projectdetails = await Project.findOne({ _id: req.params.id }).populate("postedBy", "_id name");
//         console.log(projectdetails);
//         return res.status(201).send({ projectde: projectdetails });

//     } catch (err) {
//         console.log(err);

//     }



// });


router.get('/projectdetails/:id', (req, res) => {
    Project.findOne({ _id: req.params.id })
        .then(project => {
            User.findOne({ _id: project.postedBy })
                .exec((err, user) => {
                    if (err) {
                        return res.status(422).json({ error: err })
                    }
                    return res.status(201).json({ project, user })
                })
        }).catch(err => {
            return res.status(404).json({ error: "User not found" })
        })
})



router.get('/projectdetails/:id/payment', async (req, res) => {

    try {
        const myProject = await Project.findOne({ _id: req.params.id }).populate("postedBy", "_id name");
        console.log(myProject);
        return res.status(201).send({ myProject });

    } catch (err) {
        console.log(err)
    }

})










//search project

router.post('/search-project', (req, res) => {
    let projectPattern = new RegExp("^" + req.body.query)
    Project.find({ tags: { $regex: projectPattern } })
        .then(project => {
            res.json({ project })
        }).catch(err => {
            console.log(err)
        })

})


router.put('/comment', authenticate, async (req, res) => {


    const comment = {
        text: req.body.text,
        postedBy: req.rootUser
    }
    Project.findByIdAndUpdate({ _id: req.body.postId }, {
        $push: { comments: comment }
    }, {
        new: true
    })
        .populate("comments.postedBy", "_id name")
        .then(project => {
            User.findOne({ _id: project.postedBy })
                .exec((err, result) => {
                    if (err) {
                        return res.status(422).json({ error: err })
                    } else {
                        res.json(result)
                    }
                })
        }).catch(err => {
            return res.status(404).json({ error: "User not found" })
        })
})





module.exports = router;