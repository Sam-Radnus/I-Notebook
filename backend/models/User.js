const mongoose=require('mongoose');
const { Schema } = mongoose;
const UserSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    DOB:{
        type:Date,
        
    }
  });
  const User=mongoose.model('User',UserSchema);
  User.createIndexes({ unique: true });
  module.exports=mongoose.model('User',UserSchema);