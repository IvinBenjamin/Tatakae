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
            
        }
        console.log(datetime)

        const auth = {
            userId: req.session.userId,
            isLoggedIn: req.session.isLoggedIn
        }
        
        feedbackManager.createFeedback(newFeedback,auth, function(errors){
            const errorTranslations = {
                titleTooShort: "the title is needs to be at least 4 characters",
                animeTooShort: "the anime name is supposed to be at least 4 characters",
                internalError: "Cant query out the request now.",
                contentTooShort:"the content is supposed to be at least 3 characters",
                contentTooLong: "the content is supposed to be at least under 260 characters",
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