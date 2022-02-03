const mongoose =require('mongoose');
const mongoURI="mongodb+srv://sam_sundar:brucewayneisbatman@cluster0.o1qwt.mongodb.net/mernstack?retryWrites=true&w=majority"
const connectToMongo=async()=>{
    await mongoose.connect(mongoURI).then(()=>{
        console.log("Connected to Mongo Successfully")
    }).catch((err)=>console.log(err));
}
module.exports=connectToMongo;