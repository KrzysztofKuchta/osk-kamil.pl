import mongoose from "mongoose";

const schema =  mongoose.Schema;

const messageSchema = new schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required:true
    },
    telephoneNumber:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    }

})

const messageModel = new mongoose.model('Message', messageSchema)
export  {
    messageModel
}