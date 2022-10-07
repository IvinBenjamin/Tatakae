module.exports = function({profileRepository}){

    const exports = {}

    exports.getProfile = function(callback){
        profileRepository.getProfile(callback)
    }

    exports.updateProfile = function(newProfile,auth, callback){
        const errors = profileValidator.validateProfile(newProfile, callback)
        if(errors.length > 0){
            callback(errors,null)
            return
        }
        if(auth.userId === auth.authorId){
            profileRepository.updateprofileByUserId(newProfile, callback)
        }
        else callback(['notLoggedIn'], null)
    }

    exports.deleteProfile = function(id,auth, callback){        
        if(auth.userId === auth.authorId){
            profileRepository.deleteFeedbackById(id, callback)
        }
        else callback(['notLoggedIn'], null)
    }
    return exports

}