const USERNAME_MIN_LENGTH = 4
const USERNAME_MAX_LENGTH = 15


exports.validateFeedback = function(feedback){
	
	const errors = []
	
	if(user.username.length < USERNAME_MIN_LENGTH){
		errors.push("titleTooShort")
	}
	if(feedback.anime.length < ANIME_NAME_MIN_LENGTH){
		errors.push("animeTooShort")
	}
	return errors	
}