const USERNAME_MIN_LENGTH = 4


exports.validateFeedback = function(feedback){
	
	const errors = []
	
	if(feedback.title.length < TITLE_MIN_LENGTH){
		errors.push("titleTooShort")
	}
	if(feedback.anime.length < ANIME_NAME_MIN_LENGTH){
		errors.push("animeTooShort")
	}
	if(feedback.content.length < REVIEW_MIN_LENGTH){
		errors.push("contentTooShort")
    }
    if(feedback.content.length > REVIEW_MAX_LENGTH){
		errors.push("contentTooLong")
	}
	return errors
	
}