  const mongoose=require('mongoose')
  const { Schema } = mongoose;

  const personShema=new Schema({
   name:{type:String,required:true},
   age:{type:String},
   favoriteFood:{type:[String]},
  })
  const person = mongoose.model('person', personShema );

  module.exports=person