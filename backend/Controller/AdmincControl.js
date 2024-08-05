import { v4 as uuidv4 } from 'uuid';


let Admins =[
    {
     Username:"Majembe",
     email:"Majevincent0@gmail.com",
     password : "Password"  
    }
]


export const AdminLogin = async(req,res)=>{
    try{
     const {Username, password} = req.body;
  const Admin = Admins.find((Admin)=>Admin.Username === Username && Admin.password === password)
 
 if( !Admin){
    res.status(401).send({message:'Invalid Credentials'});
    
 
 } else{
    
    res.send('Logged in succesful')
 }}
 catch (error) {
     console.error(error);
     res.status(500).json({ message: 'Internal server error' });
 }}
export const AdminPlus =(req,res)=>{
const Register =req.body;

const  registered = {...Register, id:uuidv4()};

Admins.push(registered);
res.send('Registered an Admin')

}
export const Adminfind  = (req,res)=>{
 const  {id} = req.params;
    Admins.find((Admin)=> Admin.id === id)
    res.send('Welcome Admin')
}

export const Adminminus = (req,res)=>{
    const  {id} = req.params;


    Admins.filter((Admin)=> Admin.id !== id)

    res.send('Amin By Name{--} has been deleted')

}
