import {AuthController} from '../controllers/authController.js'
import {body} from "express-validator";
import express from "express";
import {authMiddleware} from '../middlewares/authMiddleware.js'

const router = express.Router()

router.post('/api/v1/login',
    body('email').isEmail(),
    body('password').isLength({min: 6})
    ,AuthController.login)

router.post('/api/v1/register',
    body('email').isEmail(),
    body('password').isLength({min: 6}),
    AuthController.register)

router.post('/api/v1/refresh-token', AuthController.refreshToken)

router.post('/api/v1/logout', AuthController.logout)

router.post('/api/v1/change-password', AuthController.changePassword)

export {
    router as authRouter
}

