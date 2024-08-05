import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import UserRoutes from './Routes/UserRoutes.js'
import AdminRoutes from './Routes/AdminRoutes.js'
import dotenv from 'dotenv';
dotenv.config()


const app = express();


app.use(cors());
app.use(express.json());
try{
mongoose.connect(process.env.MONGOOSE_URL)

console.log('Connected')
} catch(error){
    console.log('failed')
}

const PORT = 5001;



app.use('/users',UserRoutes);
app.use('/Admin', AdminRoutes)


app.listen(PORT,()=>{console.log(`Server running from port:${PORT}`)})
