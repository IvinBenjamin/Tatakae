const connection = require('./db')

module.exports = function(){

    const exports = {}

    exports.createUser = function(newUser,callback){
        const query = " INSERT INTO user(username, password, dateOfJoining) VALUES(?,?,?)"
        const values = [newUser.username,newUser.password,newUser.dateOfJoining]
        connection.query(query, values, function(error){
            if(error){
                
                if(error.sqlMessage.includes('usernameUnique')){
                    callback(['usernameTaken'])
                }else{
                    callback(['internalError']) 
                }
            }else{
                callback([])
            }
            
        })
    }
    
    exports.getUserByUserName = function(username,callback){
        const query = " SELECT * FROM user WHERE username = ?"
        const values = [username]
        connection.query(query,values,function(error,user){
            if(error){
                callback(['internalError'],null)
            }else if(user.length==0 || user[0] == undefined){
                callback(['invalidUsername'],null)
            }else{
                callback([],user[0])
            }
        })
    }

    exports.getAllUsers = function(callback){
        const query = "SELECT U.username, U.dateOfJoining FROM user AS U"
        connection.query(query,function(error, users){
            if(error){
                callback(['internalError'],null)
            }else{
                callback([],users)
            }
        })
    }

    exports.getUserById = function(id,callback){
        const query = `
            SELECT username FROM user WHERE userid = ? 
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


    //exports.updateUserById= function(newUser, callback){
    //    const query = "UPDATE user SET username = ? WHERE id = ?"
    //    const values = [newUser.username, newUser.userId]
//
    //    connection.query(query,values,function(error){
    //        if(error){                
    //            callback(['internalError'])
    //        }else{
    //            callback([])
    //        }
    //    })
    //}


    return exports
}


