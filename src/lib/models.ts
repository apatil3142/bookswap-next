import mongoose, { Schema } from "mongoose";
const {ObjectId} = mongoose.Schema.Types

const userSchema: Schema = new mongoose.Schema({
  name:{
    type: String,
    require: true,
    unique: true
  },
  email:{
      type: String,
      require: true,
      unique: true
  },
  password:{
      type:String,
      require:true
  },
}, {timestamps: true});

const bookSchema = new mongoose.Schema({
  title: {
    type: String, 
    require: true
  },
  abbreviation: {
    type: String, 
    require: true
  },
  amount: {
    type: Number, 
    require: true
  },
  city: {
    type: String, 
    require: true
  },
  postedBy: {
    type: ObjectId, 
    ref: 'User'
  },
  image: {
    type: String, 
    require: true
  },
  cloudinaryId: {
    type: String, 
    require: true
  }
},{timestamps: true});

const conversationSchema: Schema = new mongoose.Schema({
  members:{
    type: Array,
    require: true,
  }
}, {timestamps: true});

const messageSchema: Schema = new mongoose.Schema({
  conversationId:{
    type: String,
    require: true,
  },
  sender:{
      type: String,
      require: true,
  },
  text:{
      type:String,
      require:true
  },
}, {timestamps: true})


export const User = mongoose.models?.User || mongoose.model("User", userSchema);
export const Book = mongoose.models?.Book || mongoose.model("Book", bookSchema);
export const Message = mongoose.models?.Message || mongoose.model("Message", messageSchema);
export const Conversation = mongoose.models?.Conversation || mongoose.model("Conversation", conversationSchema);
