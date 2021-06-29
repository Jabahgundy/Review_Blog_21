'use strict'

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const UserModel = require('../models/Users');

router.get('/signup', (req, res) => {
    res.render('template', {
        locals: {
            title: 'Register for an Account',
            is_logged_in: req.session.is_logged_in
        },
        partials: {
            body: 'partials/signup',
        },
    });
});

router.get('/login', (req, res) => {
    res.render('template', {
        locals: {
            title: 'User Login',
            is_logged_in: req.session.is_logged_in
        },
        partials: {
            body: 'partials/login',
        },
    });
});



router.post('/signup', async (req, res) => {
    const { first_name, last_name, email, password } = req.body;

    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(password, salt);

    const response = await UserModel.addUser(first_name, last_name, email, hash);
    console.log("POST REsponse is: ", response);
    if (!!response.id) {
        res.redirect('/users/login');
    } else {
        res.status(500).send("Error: Please submit the form again");
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = new UserModel(null, null, null, email, password);
    const response = await user.login();
    console.log('USER Login: ', response);


    if (!!response.isValid) {
        const { isValid, user_id, first_name, last_name } = response;
        req.session.is_logged_in = isValid;
        req.session.user_id = user_id;
        req.session.first_name = first_name;
        req.session.last_name = last_name;

        res.redirect('/');


    } else {
        res.sendStatus(403);
    }

});

module.exports = router;





















module.exports = router;