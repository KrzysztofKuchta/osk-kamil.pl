import {messageModel} from "../db/models/messageModel.js";
import {validationResult} from "express-validator";

class MessageController{
    async createMessage(req,res){
        const maxAgeInMilliseconds =  24 * 60 * 60 * 1000; // one day


        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {name, email, telephoneNumber, message} = req.body

        const Message = new messageModel ({
            name,
            email: email.toLowerCase(),
            telephoneNumber,
            message
        })
        const canCreateMessage = false
        try {
            res.cookie('canCreateMessage', canCreateMessage, {
                maxAge: maxAgeInMilliseconds,
                secure: true,
                httpOnly: true,
                sameSite: 'lax'
            });

            await Message.save();
            return res.status(201).json({message : "Message created successfully"})
        }catch (e){
            return res.status(400).json({message: e.message})
        }
    }
    async showAllMessages(req,res){
        try {
            const Messages = await messageModel.find()

            return res.status(200).json({message: Messages})
        }catch (e) {
            return res.status(400).json({message: e.message})
        }

    }

    async deleteMessage(req,res){
        const {id} = req.body
        try {
            await messageModel.deleteOne({_id : id})
            return res.status(200).json({success : true, message : "message deleted successfully"})
        } catch (e) {
            return res.status(400).json({success : false, message : e.message})

        }
    }

}
MessageController = new MessageController()

export {
    MessageController
}