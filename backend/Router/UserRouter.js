 
import express from 'express';
import { SaccoRegistration,SaccoList,MemberLogin,MemberDetails,BoardMemberRole} from '../Controller/Usercontrol.js';

 

const  router = express.Router();


router.post('/SacccoRegisteration',SaccoRegistration )
router.post('/Login',MemberLogin)
router.get('/SaccoList',SaccoList)
router.get('/cookies', MemberDetails)
router.get('/role',BoardMemberRole)

 
  
 
export default router;