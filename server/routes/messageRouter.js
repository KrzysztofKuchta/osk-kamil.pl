import {MessageController} from "../controllers/messageController.js";
import {body} from "express-validator";
import express from "express";
import {authMiddleware} from '../middlewares/authMiddleware.js'
import {canCreateMessage} from "../middlewares/canCreateMessage.js";

const router = express.Router()

router.get('/api/v1/show-messages', authMiddleware , MessageController.showAllMessages)

router.post('/api/v1/create-message',
    body('email').isEmail().withMessage('Incorrect e-mail address'),
    body('telephoneNumber').isLength({min: 9, max: 11}),
    body('name').notEmpty(),
    body('message').notEmpty(),
    canCreateMessage,
    MessageController.createMessage)

router.post('/api/v1/delete-message',
    body('id').notEmpty(),
    authMiddleware,
    MessageController.deleteMessage)

export {
    router as messageRouter
}