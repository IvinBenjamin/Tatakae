const express = require('express')


module.exports = function({userManager}){
    const router = express.Router()

router.get('/profile', (req, res) => {

    res.render('profile.hbs')
})