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

const stripe = require("stripe")("sk_test_51J6aoDKc0TZv9NwK4iBPEs9bMK2eknweXnjrlMSYGcx74nNBeGWfTZExeXvLVJAEdKzMdOfrkBf4iZimMj2lA98B00XI6BwpT1")
const { v4: uuidv4 } = require('uuid');

router.post("/payment1", (req, res) => {
    const { token, name1, price, backer, backamount } = req.body;

    const idempontencyKey = uuidv4();


    return stripe.customers
        .create({
            email: token.email,
            source: token.id
        })
        .then(customer => {
            stripe.charges.create(
                {

                    amount: backamount * 100,
                    currency: "usd",
                    customer: customer.id,
                    receipt_email: token.email,
                    description: `purchase of ${name1}`,
                    shipping: {
                        name: token.card.name,
                        address: {
                            country: token.card.address_country
                        }
                    }
                },
                { idempontencyKey }
            );
        })
        .then(result => {
            res.status(200).json(result)
            Project.findOne({ _id: name1 })
                .then(project => {
                    project.raisedamount = project.raisedamount + parseInt(backamount)

                    return res.status(201).json({ result })

                }).catch(err => {
                    return res.status(404).json({ error: "User not found" })
                })


        })
        .catch(err => console.log(err));
});

module.exports = router;