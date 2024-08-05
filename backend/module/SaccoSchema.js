import mongoose from "mongoose";

 

const saccoSchema = new mongoose.Schema({
   id:{
   type:String,
   required:true,
   unique: true 
   },
  SaccoName: {
    type: String,
    required: true,
    unique: true 
  },
  SaccoLocation: {
    type: String,
    required: true,
  },
  ActiveChairperson: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  OperationPeriod: {
    type: Number, // Can be a String or a Number depending on your needs
    required: true,
  },
  members: [{ type: String, ref: 'Member' }]
  
})
saccoSchema.index({SaccoName:1},{unique:true})

 const SaccoModel= mongoose.model('Sacco', saccoSchema);
  
 export default SaccoModel