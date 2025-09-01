const express = require("express");
const app = express();
require('dotenv').config();
const mongoose = require("mongoose");
const Contact = require("./models/contacts.models");


// Database strings
// if you are see this string then if you want to use then you can its just for you 🙃

// mongodb+srv://aribaonsocial:22647@cluster0.0vqz1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

// Database connection 
mongoose.connect(process.env.MONGO_URL).then(() =>{
  console.log("Database connected.");
})


// middle ware 
app.set('view engine','ejs')

// help to getting form data 
app.use(express.urlencoded({extended:false}))
app.use(express.static('public'))

// routes 
app.get('/',async (req,res)=>{
  const contacts = await Contact.find();
  // res.json(contacts);
  res.render('home',{contacts});
})
app.get('/show-contact/:id', async (req,res)=>{
  // const contact = await Contact.findOne({_id: req.params.id})
  const contact = await Contact.findById(req.params.id)
  // res.json(contact);
  res.render('show-contact',{contact});
})
app.get('/add-contact',(req,res)=>{
  res.render('add-contact');
})
app.post('/add-contact',async (req,res)=>{
  // const contact = await Contact.insertOne({
  //   first_name : req.body.first_name,
  //   last_name : req.body.last_name,
  //   email : req.body.email,
  //   phone : req.body.phone,
  //   address : req.body.address,
  // })
  // res.redirect("/");

  // or 

  await Contact.create(req.body);
  res.redirect("/");

})
app.get('/update-contact/:id', async (req,res)=>{
  const contact = await Contact.findById(req.params.id);
  res.render('update-contact',{contact});
})

app.post('/update-contact/:id', async  (req,res)=>{
  // await Contact.findByIdAndUpdate(req.params.id,req.body)
  // res.redirect("/");
  
  // if database filed name != form field name
  const {first_name,last_name,email,phone,address} = req.body;
  await Contact.findByIdAndUpdate(req.params.id, {first_name,last_name,email,phone,address})
  res.redirect("/");
})

app.get('/delete-contact/:id', async (req,res)=>{
  await Contact.findByIdAndDelete(req.params.id);
  res.redirect("/");
})

app.listen(process.env.PORT || 3001 ,()=>{
  console.log(`Server started successfully on port 3000 http://localhost:${process.env.PORT}/`);
})

