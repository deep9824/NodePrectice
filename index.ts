import  express  from "express"
import connect from './config/db'
import dotenv from "dotenv"
import router from "./config/src/routes"
import cookieParser from 'cookie-parser'
import errorHandlerMiddleware from "./config/src/middlewares/errorHandler"

connect()
dotenv.config()
const app=express()
app.use(cookieParser(process.env.SECRET_JWT_CODE))
app.use(express.json())
app.use(errorHandlerMiddleware)
app.use('/api',router)
app.listen(process.env.PORT, () => {
    console.log(`Server Started at ${process.env.PORT}`)
})