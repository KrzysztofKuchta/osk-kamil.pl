import express from 'express'
import {messageRouter} from "./routes/messageRouter.js";
import {authRouter} from "./routes/authRouter.js";
import {port} from "./config/config.js";
import cookieParser from "cookie-parser"
import './db/mongoose.js'

const app = express()

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cookieParser())

app.use(messageRouter)
app.use(authRouter)


app.listen(port, ()=>{
    console.log(`app listening on port ${port}`)
})