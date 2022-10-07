const express = require('express')

module.exports = function({profileManager}){
    const router = express.Router()

    router.get('/profile', (req, res) => {

        res.render('profile.hbs')
    })

}