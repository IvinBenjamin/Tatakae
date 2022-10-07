const express = require('express')

router.get('/profile', (req, res) => {

    res.render('profile.hbs')
})