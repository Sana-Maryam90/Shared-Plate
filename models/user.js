import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  });
  
  const User = mongoose.models.user || mongoose.model('user', userSchema, 'user');
  
  export default User;
  