import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fname: { type: String, unique: false },
  lname: { type: String, unique: false },
  email: { type: String, unique: true },
  password: { type: String, unique: false },
  profilePicture: {
    data: Buffer,
    contentType: String,
    default: {}
  },

});

export default mongoose.model("users", userSchema);

// export default userSchema;


