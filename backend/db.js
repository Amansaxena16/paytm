const mongoose = require("mongoose");

// Connection Mongo Db witht the backend
mongoose.connect("mongodb://localhost:27017/paytm")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("Mongo db connecting erro : ",err));


const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: String,
    unique:  String,
    trim: String,
    lowercase: String,
    minLength: 3,
    maxLength: 15
  },
  first_name: {
    type: String,
    require: true,
    trim: true,
    maxLength: 20
  },
  last_name: {
    type: String,
    require: true,
    trim: true,
    maxLength: 20
  },
  password: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 20,
    trim: true,
  },

})

const User = mongoose.model("User", userSchema)

module.exports = User;