const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  age: Number,
  address : String
})

const UserSchemaModel = mongoose.model('user' ,UserSchema)


  module.exports = UserSchemaModel;