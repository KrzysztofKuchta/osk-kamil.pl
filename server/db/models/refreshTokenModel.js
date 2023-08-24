import mongoose from "mongoose";

const Schema = mongoose.Schema

const  refreshTokensSchema = new Schema({
    token:{
        type:String,
        required: true,
        unique: true
    }
})

const refreshTokens = new mongoose.model('refreshTokens', refreshTokensSchema)

export {
    refreshTokens
}