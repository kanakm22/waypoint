const mongoose, {Schema} = require("mongoose");

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
  },
  repos: [
    {
      default: [],
      type: Schema.Types.ObjectId,
      ref: "Repository"
    }
  ],
  followedUsers: [
    {
      default: [],
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  starRepos: [
    {
      default: [],
      type: Schema.Types.ObjectId,
      ref: "Repository"
    }
  ]

}) ;

const User =  mongoose.model("User", "UserSchema");

export default User;