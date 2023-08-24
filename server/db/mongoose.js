import mongoose from "mongoose";
import {db} from '../config/config.js'

try {
    mongoose.connect(db)
}catch (err){
    if(err){
        throw new error(err)
    }
}


