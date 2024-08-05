import mongoose  from 'mongoose'


const AdminSchema =new mongoose.Schema({
    id:{
        type:String,
        unique:true
    },
    Name:{
        type:String,
        Unique:true,
    },
    Location:{
        type:String,
        require:true
    },
    Email:{
        type:String,
        required:true,
    },
    Telephone:{
        type:String,
        required:trusted
    },
    Status:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['SuperAdmin','Level1Admin','Level2Admin','Level3Admin'],
        required:true
    }

});
const AdminModel = mongoose.model('Admin',AdminSchema)
export default AdminModel;