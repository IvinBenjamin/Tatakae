const express = require('express')
const fetch = require('node-fetch');

module.exports = function(){
    const router = express.Router()

    router.get("/", (req,res) => {
        
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '8a0a32071dmshc3f86074e4ab522p137892jsn57fc53999b6f',
                'X-RapidAPI-Host': 'anime-db.p.rapidapi.com'
            }
        };
        
        fetch('https://anime-db.p.rapidapi.com/anime?page=1&size=10&sortBy=ranking&sortOrder=asc', options)
            .then(response => response.json())
            .then(data => {
               const 
            })
            .catch(err => console.error(err));
        res.render('index.hbs')
    }) 

    router.get('/feedbacks', (req, res) => {
        res.render('feedbacks.hbs')
    })
    
    router.get('/profile', (req, res) => {
        res.render('profile.hbs')
    })
    
    return router
}
