import {v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
 
import cryptoJs from 'crypto-js';
import SaccoModel from "../Schemas/SaccoSchema.js";
import MemberModel from "../Schemas/UserSchema.js";
  
//Registrations Sacoos And Members
export const UserRegister = async (req,res) =>{
    const  NewSacco = req.body. saccoData;
    const Member = req.body. tableData;
    
    const SaccoName =NewSacco.SaccoName;

const SaccoId = uuidv4()

const MemberMapped = await Promise.all (Member.map( async (member)=>{
    const memberName =member.Name;
    const memberSlice=memberName.slice(0,3).toUpperCase();
    const SaccoSlice = SaccoName.slice(0,3).toUpperCase();
    const Crypto =cryptoJs.lib.WordArray.random(32).toString(cryptoJs.enc.Hex);
const CryptoSlice= Crypto.slice(0,4);
const memberId =(SaccoSlice+memberSlice+CryptoSlice)

//hashingPassword
 
    const saltRounds =12;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(member.Password, salt);
    


const MemberUpdate={
Memberid: memberId,
Name:member.Name,
Phone_Number:member.Phone_Number,
Email:member.Email,
Address:member.Address,
Occupation:member.Occupation,
Gender:member.Gender,
Id_NIN:member.Id_NIN,
Password:hashedPassword,
Sacco:SaccoId,
}
return MemberUpdate
}))



const memberIdArray = MemberMapped.map((member) =>{ return member.Memberid});

 
 //Havint the SaccoDtails
 const SaccoDetails ={
    id:SaccoId,
    saccoName:NewSacco.SaccoName,
    saccoLocation:NewSacco.SaccoLocation,
    operationPeriod:NewSacco.OperationPeriod,
    member:memberIdArray
 } 
const SaccoSaving =await SaccoModel.create({...SaccoDetails});
const MemberRegisterd =await MemberModel.create(MemberMapped)
     if(SaccoSaving && MemberRegisterd){
        res.json({message:'Registration successfully'})
     } else{
        res.json({message:'Failed to Register'})
     }
}