import express from 'express';
import { AdminLogin } from '../Controller/AdminController.js';


const route = express.Router()

route.post('/AdminLogin',AdminLogin)




export default route;