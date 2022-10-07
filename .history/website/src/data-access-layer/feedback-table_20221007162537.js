const connection = require('./db')
module.exports = function(){
    const exports = {}
    
    exports.createFeedback= function(newFeedback,callback){
        const query = "INSERT INTO feedback(title,content,anime,rate,genre,date,userId) VALUES(?,?,?,?)"
        const values = [newFeedback.title,newFeedback.content,newFeedback.anime,newFeedback.rate,newFeedback.genre,newFeedback.date,newFeedback.userId]

        connection.query(query,values,function(error){
            if(error){                
                callback(['internalError'])
            }else{
                callback([])
            }
        })
    }

    exports.updateFeedbackById= function(newFeedback,callback){
        const query = "UPDATE feedback SET title = ?, content = ?, anime= ?, rate= ?, genre= ?, , date= ? WHERE id=?"
        const values = [newFeedback.title,newFeedback.content,newFeedback.anime,newFeedback.rate,newFeedback.genre,newFeedback.date,newFeedback.id,newFeedback.userId]

        connection.query(query,values,function(error){
            if(error){                
                callback(['internalError'])
            }else{
                callback([])
            }
        })
    }

    exports.deleteFeedbackById= function(id,callback){
        const query = "DELETE F FROM feedback AS F WHERE F.id = ?"
        const values = [id]

        connection.query(query,values,function(error){
            if(error){                
                callback(['internalError'])
            }else{
                callback([])
            }
        })
    }

    exports.getFeedbackById = function(id,callback){
        const query = `
            SELECT F.id, F.title, F.content, F.anime, F.rate, F.genre, F.date, U.username,U.id as authorId 
            FROM feedback AS F 
            JOIN user AS U 
            ON F.userId = U.id 
            WHERE F.id = ? 
        `
        const values =[id]
        connection.query(query,values,function(error, feedback){
            if(error){
                callback(['internalError'],null)
            }else{
                
                callback([],feedback[0])
            }
        
        })
    }


    exports.getAllFeedbacks = function(callback){
        const query = "SELECT F.id, F.title, F.anime, F.rate, F.genre, F.date, FROM feedback AS F ORDER BY F.date  "
        connection.query(query,function(error, feedbacks){
            if(error){
                callback(['internalError'],null)
            }else{
                callback([],feedbacks)
            }
        })
    }
    return exports
}