import jwt from 'jsonwebtoken'
import {ACCESS_TOKEN} from "../config/config.js";

const authMiddleware = (req, res, next) =>{

    const token = req.headers['authorization']?.split(' ')[1]

    if(!token || token == "undefined"){
        return res.status(401).json({success:false, message:"undefined token"})
    }
    jwt.verify(token, ACCESS_TOKEN, (err, data) =>{
        if(err){
            return res.status(403).json({message: err.message})
        }
        req.user = data;
        next();
    })
}

export {
    authMiddleware
}