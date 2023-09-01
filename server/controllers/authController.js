import {user} from '../db/models/userModel.js'
import jwt from "jsonwebtoken";

import {refreshTokens} from "../db/models/refreshTokenModel.js";
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../config/config.js'

class AuthController{
    async login(req,res){
        const {email} = req.body
        const User =  await user.findOne({email : email})
        const maxAgeInMilliseconds = 7 * 24 * 60 * 60 * 1000;

        if(!User){
            return res.status(401).json({message: 'Bledne dane logowania!!! '})
        }

        const isValidPassword = User.comparePassword(req.body.password);

        if (!isValidPassword) {

            return res.status(403).json({message : "Password not valid", success : false})
            throw new Error('password not valid');
        }

        const payload = {
            email: User.email
        }

        const token = jwt.sign(payload, ACCESS_TOKEN, {expiresIn: '1w'})
        const refreshToken = jwt.sign(payload,REFRESH_TOKEN)
        const RefreshTokens = new refreshTokens({token : refreshToken})

        try{
            res.cookie('refreshToken', refreshToken, {
                maxAge: maxAgeInMilliseconds,
                secure: true,
                httpOnly: true,
                sameSite: 'lax'
            });
            console.log('cookie saved')
            await RefreshTokens.save()
            return res.json({token, refreshToken})
        }catch (err){
            return res.status(401).json({message: err.message})
        }
    }
    async register(req,res){
        const {email, password} = req.body
        const User = new user({
            email,
            password
        })
        try {
            await User.save()
            return res.status(201).json({message:"User added success fully"})
        }catch (e){
            return res.status(401).json({message : e.message})
        }
    }
    async refreshToken(req,res){

        const  token  = req.cookies.refreshToken

        const refreshToken = await refreshTokens.findOne({token : token})

        if(!refreshToken){
            return res.status(403).json({message :  'Uzytkownik nie autoryzowany'})
        }

        jwt.verify(token, REFRESH_TOKEN, (err,data)=>{
            if(err){
                return res.status(403).json({message:'Uzytkownik nie autoryzowany!!!'})
            }
            const payload = {
                email: data.email
            }
            const newAccesToken = jwt.sign(payload, ACCESS_TOKEN)
            res.json({token: newAccesToken})
        })
    }
    async logout(req,res){
        const { refreshToken } = req.cookies

        try {
            await refreshTokens.deleteOne({ token: refreshToken });
            res.clearCookie('refreshToken');
            return res.status(201).json({ message: 'Refresh token został usunięty.' });
        } catch (err) {
            return res.status(403).json({ message: err.message });
        }

    }

    async changePassword(req,res){
        const {refreshToken} = req.cookies
        const {newPassword} = req.body
        const userEmail = jwt.verify(refreshToken, REFRESH_TOKEN).email;

       console.log(userEmail)

        try{ 
            const User = await User.findOne({email: userEmail})
            User.password = newPassword
            await User.save()
            return res.status(200).json({success  : true, message : "Password changed"})
        }catch(e){
            return  res.status(401).json({success  : false, message : e.message})
        }

    }
}
AuthController = new AuthController()
export {
    AuthController
}
