import Post from "../models/Post.js";
import User from "../models/User.js";

/* CREATE */
export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},//2wal she be koun fe wala like
      comments: [],// wkamen 2wal ma n3mal lpost be koun fe wala comment
    });
    await newPost.save();

    const post = await Post.find();// hon 3am tale3 kel lposts le bel database 
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */
export const getFeedPosts = async (req, res) => { // mana ntale3 kel lposts le bel database
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);/*3am nshouf eza luserId lBoolean
    la elo true or false bel Map,eza true y3ne 3am y3mal delete la like weza
     false y3ne 3am y3mal like

     y3ne We are trying to get the value associated with the userId key 
     from the post.likes Map. The isLiked variable will contain the value 
     associated with that userId key if it exists in the Map. If the key is
      not found in the Map, isLiked will be undefined.
      */


    if (isLiked) {
      post.likes.delete(userId); // 3m nmahe userId men like Map 
    } else {
      post.likes.set(userId, true); // 3am  nzeed luserId 3ala like Map wel Bolean la elo 3am nhoto true
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true } 

      /*-When new is set to true, the method will return the updated 
      document after the update operation has been applied. 
      This means that updatedPost will contain the document
       with the changes made by the update operation. */

       /*-When new is set to false or omitted (which is the default), 
       the method will return the document as it was before the update operation. 
       This means that updatedPost will contain the document in its 
       state before the update was applied. */
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
