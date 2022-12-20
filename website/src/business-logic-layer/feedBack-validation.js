const GAME_NAME_MIN_LENGTH = 4
const REVIEW_MIN_LENGTH = 3
const REVIEW_MAX_LENGTH = 1000

exports.validateFeedback = function(feedback){
	
	const errors = []
	
	if(feedback.anime.length < GAME_NAME_MIN_LENGTH){
		errors.push("gameTooShort")
	}
	if(feedback.content.length < REVIEW_MIN_LENGTH){
		errors.push("contentTooShort")
    }
    if(feedback.content.length > REVIEW_MAX_LENGTH){
		errors.push("contentTooLong")
	}
	
	return errors
	
}