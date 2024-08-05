import express from 'express';
import { AdminPlus,AdminLogin, Adminminus, Adminfind } from '../Controller/AdmincControl.js';
 
 


//Herewe are initilizing the router
const  router = express.Router();

router.post('/', AdminLogin)
router.get('/:id',Adminfind)
 router.delete('/:id', Adminminus)
 router.post('/', AdminPlus)
export default  router;