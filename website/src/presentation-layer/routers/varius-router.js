const express = require('express')

module.exports = function(){
    const router = express.Router()

    router.get("/", (req,res) => {
        res.render('index.hbs')
    }) 

    router.get('/feedbacks', (req, res) => {
        res.render('feedbacks.hbs')
    })
    
    router.get('/profile', (req, res) => {
        res.render('profile.hbs')
    })

    router.get('/topAnimes', (req, res) => {
        res.render('topAnimes.hbs')
    })

    return router
}
