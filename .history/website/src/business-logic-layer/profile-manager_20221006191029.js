module.exports = function({profileRepository}){

    const exports = {}

    exports.getProfile = function(callback){
        profileRepository.getProfile(callback)
    }

    exports.updateProfile = function(newProfile,auth, callback){
        const errors = profileValidator.validateFeedback(newProfile, callback)
        if(errors.length > 0){
            callback(errors,null)
            return
        }
        if(auth.userId === auth.authorId){
            feedbackRepository.updateFeedbackById(newFeedback, callback)
        }
        else callback(['notLoggedIn'], null)
    }

    exports.deleteFeedback = function(id,auth, callback){        
        if(auth.userId === auth.authorId){
            feedbackRepository.deleteFeedbackById(id, callback)
        }
        else callback(['notLoggedIn'], null)
    }
    return exports

}