import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    location: String,
    description: String,
    picturePath: String,
    userPicturePath: String,
    likes: {/*The likes field in this schema is expected to be a
               Map where the keys represent something like user IDs or usernames, 
               and the values represent whether the user has liked the post 
               (a Boolean value indicating true or false). Note:fena nesta3mel ltype
               Array bas lMap ahsan*/
               /*y3ne hon kel userId mahtout elo Boolean la hwe true or false,so eza
               hyda luser 3amel like be koun true eza la2 be koun false lBoolean,y3ne
               kel userId byje  mo3o true or false bhayda lma3na  ,shofe bel data folder
               bel index file fe example keef*/
      type: Map,
      of: Boolean,
    },
    comments: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
