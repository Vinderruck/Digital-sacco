import bcrypt from 'bcrypt' ;
  import { v4 as uuidv4 } from 'uuid';
  import SaccoModel from '../module/SaccoSchema.js';
  import  MemberModel from '../module/MemberSchema.js'
 import jwt, { decode } from'jsonwebtoken';
import CryptoJS from 'crypto-js';
import dotenv from 'dotenv';
dotenv.config()
 

//let Saccos=[];


 export const SaccoRegistration = async (req,res) =>{
  try {
     
 
  //const newSacco =req.body;
  const newSacco =req.body.saccoData;
  const member =req.body.tableData;
  
  // Basic validation
  if (!newSacco || !newSacco.SaccoName || !newSacco.SaccoLocation ||
    !newSacco.ActiveChairperson || !newSacco.phoneNumber || !newSacco.OperationPeriod) {
  return res.status(400).json({ message: 'Please fill in all required fields' });
}
 
  
//mapping the saccos
const SaccoId = uuidv4()

 
 
 
const mappedTableData = await Promise.all (member.map(async(member) => {
  const memberIdComb =member.Name.slice(0,3).toUpperCase(); 
  const SaccoIdComb  = newSacco.SaccoName.slice(0,3).toUpperCase(); 
  const cryptoIdComb= CryptoJS.lib.WordArray.random(2).toString(CryptoJS.enc.Hex);
  const MembersId=SaccoIdComb + memberIdComb + cryptoIdComb;
  const updatedMember = { 
    Memberid:MembersId,
    Name:member.Name,
      Phone_Number:member.Phone_Number,
      Email:member.Email, 
    Address:member.Address,
    Occupation:member.Occupation, 
    Gender:member.Gender,
     Id_NIN:member.Id_NIN,
     Sacco:SaccoId};
  // Generate a secure random salt using bcrypt
  const salt = bcrypt.genSaltSync(10);
  // Hash the member's password using the generated salt
  updatedMember.Password =await bcrypt.hash(member.Password, salt);

  return updatedMember ;
})); 

//Creating the id array to pass to the Sacco Colection
const AllmembersId =mappedTableData.map(memberData =>{return memberData.Memberid}); 
 
 
 
 
const NewSaccoId =SaccoId;
 
 
 const saccoDataWithHashedPasswords = {
  ...newSacco,
   id:NewSaccoId,
   members:AllmembersId
  
   
   
 
  

 }
  
 
  
 const CreateMember = await MemberModel.create(mappedTableData)
  
const CreateSacco = await SaccoModel.create(saccoDataWithHashedPasswords)
  if(CreateSacco){
     
    res.send('Success')
  } 

 } catch (error) {
  if (error.code === 11000) {
    // Duplicate sacco name error
    console.error('Duplicate sacco name:', error);
    res.status(409).json({ message: 'Sacco with this name already exists' });
  } else {
    console.error(error);
    res.status(500).json({ message: 'Failed to register sacco' });
  }
 }}
  


 //getting the sacco from the backend
export const SaccoList =async (req, res) => {
  {
    const saccolist=req.body;
  }
try {
  const saccos = await SaccoModel.find()
  res.json(saccos)
} catch (error) {
  res.status(500).json({message:'Failed to fetch sacco'})
  
}
};
  





  //user log in
 export const MemberLogin = async (req,res)=>{

 const {id,Password} = req.body;
  
 
 try {

 
  const member = await MemberModel.findOne({Memberid:id});
  const SaccoDetails = await SaccoModel.findOne({id:member.Sacco})
 
  if(!member){
res.status(401).send({message:`Invalid id`})
    
    return;
  }   
  
  const isPasswordCorrect = await bcrypt.compare(Password,member.Password);
  
  if (!isPasswordCorrect) {
   
    return res.status(401).send({ message: 'Incorrect password' });
  }
 //creating the sessions
 const payload = {
  //creating the payload
  Email: member.Email,
 username:member.Name,
 PhoneNumber:member.Phone_Number,
 Location:member.Address,
 Role:member.role,
  SaccoId:member.Sacco,
  SaccoName:SaccoDetails.SaccoName
   
 }; 
 const SecretKey= process.env.Jwt_Key;
 if (!SecretKey) {
  throw new Error('JWT_SECRET environment variable not found');

}  
 const Token =jwt.sign(payload,SecretKey,{expiresIn:'1h'})
  
    res.cookie('Authtoken',Token,{
      tokenType: 'Bearer', // for Specify token type
      httpOnly: true,
  secure: true,
  sameSite: 'strict',
  maxAge:360000
   
    })
   return res.json( { Token})
 } catch (error) { 
  
  return res.status(405).json({message:'Internal error'})
  
  }}

   
  
export const MemberDetails = ((req, res) => {
  const SecretKey= process.env.Jwt_Key;
   const getCookie = req.cookie;
    res.json(getCookie)
    const Decode =jwt.verify(getCookie,SecretKey)
    console.log(Decode)
});

//Exporting the Boardmember Role
export const BoardMemberRole =  async (req,res) =>{
  const role = req.body.role;
  const SaccoName = req.body.SaccoName;
  const SaccoId = req.body.SaccoId;

  console.log(role,SaccoName,SaccoId)
}