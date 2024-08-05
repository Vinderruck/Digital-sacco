import express from 'express';
 import dotenv from 'dotenv';
import UsersRoutes from './Router/UserRouter.js';
import  AdminRouter from './Router/AdminRouter.js';
import Momopay from './Router/MomoPay.js'
import SMSRouter from './Router/sendSMSRouter.js'
import cookieParser from 'cookie-parser';
//dotenv.config();

 
import mongoose from "mongoose";
 
import cors from 'cors'
 
  
 
 

const app =express();

//creating a middleware
//const isProduction = process.env.NODE_ENV === 'production';
 app.use(cors({ origin: ["http://localhost:3000"],
  credentials: true
 } ));
app.use(cookieParser())
 app.use(express.json())

//if (!isProduction) {
  // Use body-parser for development only
 // app.use(bodyParser.json());
//}
const PORT = 5000//process.env.PORT;
const connectiondb =async() =>{
  try {
    

  const Response = await mongoose.connect('mongodb+srv://vinderruck:Abrianna%401%401@cluster0.micg0yy.mongodb.net/SaccoSystem')
    .then(Response=>{ console.log('Connected to mongodb')})
  } catch (error) {
    console.error(`Failed to connect to mongodb :${error}`)
  }
}
connectiondb();
  //creating Routes
 app.use('/users', UsersRoutes)
 app.use('/Admin', AdminRouter )
  app.use('/SendSmS',SMSRouter)
  app.use('/momoPay', Momopay)



 app.listen(PORT, ()=> console.log(`Server running from port : ${PORT}`))
