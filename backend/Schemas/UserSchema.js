import moongose from 'mongoose'; 


const UserSchema = new moongose.Schema({
    Memberid:{
        type:String,
        required:true,
        unique:true
    },
    Name:{
        type:String,
        required:true,
    },
    Phone_Number:{
        type:String,
        required:true,
       
    },
    Email:{
        type:String,
        required:true,
        unique:true,
        


    },
    Address:{
        type:String,
        required:true,
    },
    Occupation:{
        type:String,
        required:true
    },
    Gender:{
        type:String,
        required:true,
        enum:['Male','Female','Others']
    },
    Id_NIN:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['Chairperson','ViceChairperson','G.Secretary','v.Secretary','Defence','Member','Treasurer','Auditor'],
        default:'Member'
    },
    
Sacco:{
    type:String, ref:'Sacco'
}
});
const MemberModel = moongose.model("Member",UserSchema)
export default MemberModel;