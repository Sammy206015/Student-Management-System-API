const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
    firstNme:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    phoneNumber:{
        type:String,
    },
    matricNumber:{
        type:String,
        required:true,
        unique:true,
        uppercase:true,
        trim:true,
    },
    gender:{
        type:String,
    },
    level:{
        type:String,
    },
    department:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Department",
        required:true,
    },
     password:{
        type:String,
        required:true,
        select:false,
    },
    
}, {timestamps:true});
const Student = mongoose.model("Student", studentSchema);
module.exports = Student;

