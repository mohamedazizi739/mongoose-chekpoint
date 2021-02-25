const mongoose=require("mongoose")
const connectdb=()=>{
   mongoose.connect('mongodb://localhost:27017/peaple', {useNewUrlParser: true},{useUnifiedTopology: true}).then(()=>console.log("mongoose is connected")).catch((err)=>console.log(err))
};
module.exports=connectdb;
