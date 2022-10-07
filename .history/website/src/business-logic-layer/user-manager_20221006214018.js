const userValidator = require('./user-validation')
const userAuthentication = require('./user-authentication')
const bcrypt = require('bcrypt')
const saltRounds = 10

module.exports= function({userRepository}){

    const exports = {}

    exports.getAllUsers = function(callback){
        userRepository.getAllUsers(callback)
    }

    exports.createUser = async (newUser, callback) =>{
        
        const errors = userValidator.validateUser(newUser)
        
        if(errors.length > 0){
            callback(errors,null)
            return
        }

        newUser.password = await bcrypt.hash(newUser.password, saltRounds)
        userRepository.createUser(newUser, callback)
    }

    exports.getUserByUserName = function(username, callback){
        userRepository.getAccountByUsername(username, callback)
    }

    exports.login = function(user, callback){
        const validationErrors = userValidator.validateUser(user)
        if(validationErrors.length > 0){
            callback(validationErrors)
            return
        }

        userRepository.getUserByUserName(user.username, function(repositoryErrors,storedUser){
          
            if(repositoryErrors.length > 0){
                callback(repositoryErrors)
            }else{
                const errors = userAuthentication.authenticateUser(storedUser,user)
                if(errors.length > 0){
                    callback(errors,null)
                }else{
                    callback([],storedUser.id)
                }
            }
        })
    }

    exports.updateUser = function(username, auth, callback){

        if(auth.userId === auth.authorId){
            userRepository.updateUserById(username, callback)
        }
        else callback(['notLoggedIn'], null)
    }

    exports.deleteUser = function(id,auth, callback){        
        if(auth.userId === auth.authorId){
            userRepository.deleteUserById(id, callback)
        }
        else callback(['notLoggedIn'], null)
    }

    return exports
}