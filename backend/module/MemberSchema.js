import mongoose from "mongoose";
const MembersSchema = new mongoose.Schema({ 
      
          Memberid:{
            type:String,
            required:true,
            unique:true
          },
        Name: {
          type: String,
          required: true,
          minlength: 2,
          maxlength: 100,
        },
        Phone_Number: {
          type: String,
          required: true,
        },
        Email: {
          type: String,
          required: false,
          lowercase: true, // Ensures email uniqueness regardless of case
          match: [/^\S+@\S+\.\S+$/, 'Invalid email format'], // Basic email validation
        },
        Address: {
          type: String,
        },
        Occupation: {
          type: String,
        },
        Gender: {
          type: String,
          enum: ['Male', 'Female', 'Other'], // Enforce valid gender values
        },
        Id_NIN: {
          type: String,
          unique:true,
          validate: {
            validator: (v) => v.length === 14,
            message: 'Invalid NIN format: Must be 14 characters long.',
          },
        },
        Password: {
          type: String,
          required: true,
        },
        role:{
          type:String,
          enum:['ChairPerson','ViceChairPerson','Speaker','GeneralSecretary','AssiatantSecretary','Treasure','Auditor','Defence','Member'],
          default:'Member'

        },
        Sacco:{ type:String, 
          ref:'Sacco',
        required:true},
   
      });
      MembersSchema.index({   Sacco: 1, id:1 }, { unique: true });
  const MemberModel = new mongoose.model('Member',MembersSchema);
  export default  MemberModel