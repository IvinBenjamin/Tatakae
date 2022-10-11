const express = require('express')
const axios = require("axios");


module.exports = function(){
    const router = express.Router()

    router.get("/", (req,res) => {
        const options = {
            method: 'GET',
            url: 'https://anime-db.p.rapidapi.com/anime',
            params: {page: '1', size: '10', sortBy: 'ranking', sortOrder: 'asc'},
            headers: {
                'X-RapidAPI-Key': '8a0a32071dmshc3f86074e4ab522p137892jsn57fc53999b6f',
                'X-RapidAPI-Host': 'anime-db.p.rapidapi.com'
                }
            };
          
            axios.request(options).then(function (response) {
                const title = document.getElementById('title')
                const genre = document.getElementById('genre')
                const ranking = document.getElementById('ranking')
                const episodes = document.getElementById('episodes')
                const animeStatus = document.getElementById('animeStatus')
                
                title.innerText = response.data

                console.log(response.data);
            }).catch(function (error) {
                console.error(error);
            });

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
