const express = require('express')

module.exports = function({profileManager}){
    const router = express.Router()

    router.get('/profile', (req, res) => {

        res.render('profile.hbs')
    })


    router.put('/:id', (req, res) => {
        var currentdate = new Date(); 
        var datetime = currentdate.getFullYear() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getDate() + "  "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();    

        const newFeedback ={
            id: req.session.userId,
            username: req.body.username
        }
        console.log(datetime)

        const auth = {
            userId: req.session.userId,
            isLoggedIn: req.session.isLoggedIn
        }
        
        feedbackManager.createFeedback(newFeedback,auth, function(errors){
            const errorTranslations = {
                usernameTooShort: "the username needs to be at least 4 characters",
                usernameTooLong: "the username needs to be at least 4 characters",
                notLoggedIn: "you're Not LoggedIn"
            }

            if(errors.length > 0){
                const errorMessages = errors.map(e => errorTranslations[e])
                const model = {
                    errors: errorMessages,
                    title: newFeedback.title,
                    anime: newFeedback.anime,
                    content: newFeedback.content,
                    genre: newFeedback.genre,
                    rate: newFeedback.rate,
                }
                res.render('create-feedback.hbs',model)

            }else{
                res.redirect('/feedbacks')
            }
        })

    })

}