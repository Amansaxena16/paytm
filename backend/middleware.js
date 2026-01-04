const { request } = require("express");
const {JWT_SECRET, decode} = require("jsonwebtoken")

const authMiddleware = (request, response, next)  => {
    const authHeader = request.headers.authorization

    if(!authHeader  ||  !authHeader.startsWith('Bearer ')){
        return response().status(403).json({
            error:  "Invalid JWT Token"
        })
    }

    const token = authHeader.split(' ')[1]

    try{
        const decoded = jwt.verify(token, JWT_SECRET)
        if(decoded.userId){
            request.userId = decoded.userId
            next()
        }else{
            return response.status(403).json({
                
            })    
        }
    }catch(err){
        return response.status(403).json({

        })
    }
}


module.exports =  {
    authMiddleware
}