import express from 'express';
import twilio from 'twilio';
import CryptoJS from 'crypto-js'; 

const router = express.Router();

const AccountSID = process.env.PersonalSID;
const AuthToken = process.env.PersonalToken;
const Client = {AccountSID,AuthToken};



router.post('/',(req,res)=>{
    const  GeneratePasswordLink=()=>{
      
        const passwordResetToken = CryptoJS.lib.WordArray.random(128).toString(CryptoJS.enc.Hex);
        
        const PasswordSET= `http://localhost:3000/UserLogin/Passwordreset?token=${passwordResetToken}`;
        return PasswordSET;

    
    const {SaccoName,PhoneNumber,Member} =req.query;
    const Message =`Hello ${Member},${SaccoName} has been registered with MV-Digital Sacco Your are required to set you Loging 
    password by clicking:${PasswordSET}`;
    Client.message.create({
        body:Message,
        to:PhoneNumber,
        from:'0700317320'
    })
    res.send('Message sent')
    .catch(error=>{
        console.error('Error sending SMS:', error);
        res.status(500).send('Error sending message'); // Handle error on server side
    });

}});

export default  router;