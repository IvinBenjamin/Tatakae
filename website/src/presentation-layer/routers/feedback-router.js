const express = require('express')
const jwt = require('jsonwebtoken')
const multer = require('multer')

const upload = multer({storage:multer.memoryStorage()})


module.exports = function({feedbackManager, commentManager}){
    const router = express.Router()
    
    router.get('/', (req, res) => {

        feedbackManager.getAllFeedbacks(function(errors, feedbacks){
            const errorTranslations = {
                internalError: "Cant query out the request now.",
            }
            
            if(errors.length > 0 ){
                const errorMessages = errors.map(e => errorTranslations[e])
                const model = {
                    errorMessages: errorMessages
                }
                res.render('feedback.hbs', model)
                
            }else{

                const model = {
                    feedbacks: feedbacks
                }
                res.render('feedbacks.hbs',model) 
            }
        })
    })
    

    router.get('/newFeedback', (req, res) => {

        res.render('create-feedback.hbs')
    })

    router.post('/newFeedback',upload.single('imageUpload'), (req, res) => {
        var currentdate = new Date(); 
        var datetime = currentdate.getFullYear() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getDate() + " "  
                + (currentdate.getHours()+2) + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();

        const newFeedback ={
            anime:req.body.anime,
            content: req.body.content,
            rate: req.body.rate,
            genre: req.body.genre,
            date: datetime,
            image: req.file,
            userId: req.session.userId,
        }

        const auth = {
            userId: req.session.userId,
            isLoggedIn: req.session.isLoggedIn
        }
        
        feedbackManager.createFeedback(newFeedback,auth, function(errors){
            const errorTranslations = {
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
                    anime: newFeedback.anime,
                    content: newFeedback.content,
                    rate: newFeedback.rate,
                    genre: newFeedback.genre,
                }
                res.render('create-feedback.hbs',model)

            }else{
                res.redirect('/feedbacks')
            }
        })

    })

    router.get('/:id', (req, res) => {

        const id = req.params.id

        feedbackManager.getFeedbackById(id, function(errors, feedback){
            
            const errorTranslations = {
                internalError: "Cant query out the request now.",
            }

            if(errors.length > 0 ){
                const errorMessages = errors.map(e => errorTranslations[e])

                const model = {
                    errorMessages: errorMessages
                }
                res.render('feedback.hbs', model)
            }else{

                commentManager.getCommentsByFeedbackId(id, function(errors, comments){
                    const errorTranslations = {
                        internalError: "Cant query out the request now."
                    }
                    if(errors.length > 0 ){
                        const errorMessages = errors.map(e => errorTranslations[e])
        
                        const model = {
                            errorMessages: errorMessages
                        }
                        res.render('feedback.hbs', model)
                    }
                        const model = {
                            feedback: feedback,
                            comments: comments
                        }
                        res.render('feedback.hbs', model)
                    
                })
            }
        })
    })

    return router
}