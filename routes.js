const express=require('express')
const router = express.Router();
const Person=require('./model.js')
router.get('/',(req,res)=>{
 res.send("it works")
})
//Create and Save a Record of a Model:
router.post("/", (req, res) => {
  const newPerson = new Person({ ...req.body });
  newPerson
    .save()
    .then(() => res.send("person has been added with success"))
    .catch((err) => res.send(err));
});
//Create Many Records with model.create()
router.post("/create", (req, res) => {
   Person.create([...req.body]).then(()=>res.send("created")).catch((err)=>res.send(err));})
 //Find all the people having a given name, using Model.find() -> [Person]
router.get("/name/:name", (req, res) => {
  Person.find({ name:req.params.name}).then((persons)=>res.json(persons)).catch((err)=>res.send(err));
});
//Use model.findOne() to Return a Single Matching Document from Your Database
router.get("/one/:food", (req, res) => {
  Person.findOne({ favoriteFood:{ $all: [req.params.food] }}).then((persons)=>res.json(persons)).catch((err)=>res.send(err))});
//Use model.findById() to Search Your Database By _id

router.get("/id/:_id", (req, res) => {
  
  Person.findById(req.params._id).then((persons)=>res.json(persons)).catch((err)=>res.send(err))});
//Perform Classic Updates by Running Find, Edit, then Save

router.post("/id/:_id", (req, res) => {
 Person.findById(req.params._id, function(err, data) {
    if (err) {

      res.send(err);
    }else{
     data.favoriteFood.push("humberger");
    data.save((err) => (err ? res.send(err) : res.send("done")));
   }
    
  }); 
});
  //Perform New Updates on a Document Using model.findOneAndUpdate()
router.post("/age/:_id", (req, res) => {
  
  Person.findOneAndUpdate({_id:req.params._id},{age:20}).then(()=>res.send("done")).catch((err)=>res.send(err))});
//Delete One Document Using model.findByIdAndRemove
router.delete("/delete/:_id", (req, res) => {
Person.findByIdAndRemove(req.params._id).then(()=>res.send("done")).catch(err=>{res.send(err)})
})
//MongoDB and Mongoose - Delete Many Documents with model.remove()
router.delete("/deletename/:name", (req, res) => {
Person.remove({ name: req.params.name }).then(()=>res.send("done")).catch(err=>{res.send(err)})
})
//Chain Search Query Helpers to Narrow Search Results
router.get("/foodseartch", (req, res) => {
  var foodToSearch = "burrito";
  Person.find({favoriteFood:[foodToSearch]}).sort({name : "desc"}).limit(2).select("-age").then((data) => {res.send(data)}).catch((err)=>res.send(err))
})
module.exports=router