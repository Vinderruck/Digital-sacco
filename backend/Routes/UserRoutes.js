import express from 'express';
import { UserRegister } from '../Controller/UserContoroller.js';

const route = express.Router()


route.post('/SacccoRegisteration', UserRegister)






export default route;