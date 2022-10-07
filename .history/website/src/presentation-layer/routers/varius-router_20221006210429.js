const express = require('express')
const { getUserByUserName } = require('../../data-access-layer/user-table')


module.exports = function(){
    const router = express.Router()

    router.get("/", (req,res) => {
        res.render('index.hbs', {username: req.user})
    }) 
    
    router.get('/feedback', (req, res) => {
        res.render('feedback.hbs')
    })
    router.get('/profile', (req, res) => {
        res.render('profile.hbs')
    })
    
    return router
}
