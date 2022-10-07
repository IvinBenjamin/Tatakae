const express = require('express')
const bcrypt = require('bcrypt')

const saltRounds = 10


module.exports = function({userManager}){
    const router = express.Router()


    router.get("/sign-up", function(request, response){
		response.render('register.hbs')
	})

	router.post("/sign-up", function(request, response){
		var currentdate = new Date(); 
    	var datetime = currentdate.getFullYear() + "/"
            + (currentdate.getMonth()+1)  + "/" 
            + currentdate.getDate() + "  "  
            + currentdate.getHours() + ":"  
            + currentdate.getMinutes() + ":" 
            + currentdate.getSeconds();


		const account = {
			username: request.body.username,
			password: request.body.password,
			confirmPassword: request.body.repeat_password,
			dateOfJoining: datetime,
		}
		
		userManager.createUser(account, function(errors, id){
			
			if(errors.length == 0){
				response.render('login.hbs')
			}else{
				
				const errorTranslations = {
					usernameTooShort: "The username needs to be at least 3 characters.",
					usernameTooLong: "The username is too long.",
					internalError: "Cant query out the request now.",
					usernameTaken: "Username already in use.",
					passwordDontMatch: "Passwords Does Not Match",
				}
				const errorMessages = errors.map(e => errorTranslations[e])
				
				const model = {
					errors: errorMessages,
					username: request.body.username,
					password: request.body.password,
					confirmPassword: request.body.repeat_password,
					dateOfJoining: request.body.dateOfJoining,				
				}
				response.render('register.hbs',model)
			}
			
		})
			
	})

	router.get('/sign-in', (req, res) => {
        res.render('login.hbs')
    })

	router.post("/sign-in", function(request, response){

		const user = {
			username: request.body.username,
			password: request.body.password,
		}      
		
		userManager.login(user,function(errors,userId){
			const errorTranslations = {
				usernameTooShort: "The username needs to be at least 3 characters.",
				usernameTooLong: "The username is too long.",
				internalError: "Cant query out the request now.",
				invalidUsername:"the username is wrong or does not exist",
				invalidPassword: "Wrong password please try again",
				passwordDontMatch: "The Password dosnt match try again",
				wrongPassword: "wrong password please try again",

			}

			if(errors.length > 0){
				const errorMessages = errors.map(e => errorTranslations[e])
				const model = {
					errors: errorMessages,
					username: user.username,
					password: user.password
				}
				response.render('login.hbs',model)
				
			}else{
				request.session.isLoggedIn = true
				request.session.userId = userId
				response.redirect('/')
			}
			
		})
    })
    
    

	router.post('/sign-out', (req, res) =>{
        req.session.isLoggedIn = false
        res.redirect('/')
    })

	router.get('/', (req, res) => {

        userManager.getAllUsers(function(errors, users){
                res.render('index.hbs', users) 
            }
        )
    })

	router.get('/:id', (req, res) => {

        const id = req.session.passport.user.id

        userManager.getFeedbackById(id, function(errors, feedback){
            
            const errorTranslations = {
                internalError: "Cant query out the request now.",
            }

            if(errors.length > 0 ){
                const errorMessages = errors.map(e => errorTranslations[e])

                const model = {
                    errorMessages: errorMessages
                }
                res.render('feedback.hbs', model)
			}
        })
    })
    return router
}

