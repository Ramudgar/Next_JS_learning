import mongoose from 'mongoose';
const userSchema= new mongoose.Schema({
    username:{
        type:String,
        required:[true,'Please provide a username'],
        unique:true
    },
    email:{
        type:String,
        required:[true,'Please provide a email'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'Please provide a password']
    },
    role:{
        type:String,
        default:'user',
        enum:['user','admin','superadmin']
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    resetPasswordToken:String,
    resetPasswordTokenExpiry:Date,
    verifyToken:String,
    verifyTokenExpiry:Date,


},{timestamps:true

})
const User=mongoose.models.users || mongoose.model('users',userSchema);
export default User;