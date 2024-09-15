const express = require('express')
const mongoose = require('mongoose')
const cors  = require('cors')

const UserModel = require('./modules/user')

const app = express()
app.use(cors())
app.use(express.json())
mongoose.connect("mongodb+srv://kotreshsh162:Kotresh162@cluster0.aifb8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")


app.get('/',(req,res)=>{
    UserModel.find({})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})
app.get('/getUser/:id',(req,res)=>{
    const id = req.params.id;
    UserModel.findById({_id:id})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})
app.put('/updateUser/:id',(req,res)=>{
    const id = req.params.id;
    UserModel.findByIdAndUpdate({_id:id},{
        name: req.body.name ,
        email: req.body.email , 
        age: req.body.age})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})
app.delete('/deletUser/:id',(req,res)=>{
    const id = req.params.id;
    UserModel.findByIdAndDelete({_id:id})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.post("/createUser",(req,res) =>{
    UserModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err))
})
app.listen(3001,()=>{
    console.log("server is running on port 3001")
})