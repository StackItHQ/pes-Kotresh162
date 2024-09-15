const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
})

const UserModel = mongoose.model("dbsheet",userSchema) 
 module.exports = UserModel