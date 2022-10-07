module.exports = function({feedbackRepository}){

    const exports = {}

    exports.getAllFeedbacks = function(callback){
        feedbackRepository.getAllFeedbacks(callback)
    }

    exports.getFeedbackById = function(id, callback){
        feedbackRepository.getFeedbackById(id, callback)
    }


    exports.updateProfile = function(newFeedback,auth, callback){
        const errors = feedbackValidator.validateFeedback(newFeedback, callback)
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