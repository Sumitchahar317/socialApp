const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const verifyToken = require('../middleware/auth'); 


router.post('/create', verifyToken, async (req, res) => {
  try {
    const { text, image } = req.body;

    const newPost = new Post({
      user: req.user.id, // ID pulled from the JWT
      content: { text, image }
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// route to get all posts 
router.get('/all', async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('user', 'username')
      .sort({ createdAt: -1 }); // Newest posts first

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

    // Route to Like / Unlike a post
    router.put('/:id/like', verifyToken, async (req, res) => {
      try {
        const post = await Post.findById(req.params.id);
    
      // Check if the user has already liked the post or not
      if (!post.likes.includes(req.user.id)) {
        // If NOT liked: Add the user ID to the array
       await post.updateOne({ $push: { likes: req.user.id } });
        res.status(200).json("The post has been liked");
       } else {
        // If ALREADY liked: Remove the user ID (Unlike)
        await post.updateOne({ $pull: { likes: req.user.id } });
       res.status(200).json("The post has been unliked");
     }
      } 
      catch (err) {
      res.status(500).json(err);
      }
      });


      // comment on a post
      router.post('/:id/comment', verifyToken, async (req, res) => {
      try {
        const post = await Post.findById(req.params.id);
        const newComment = {
         user: req.user.id,
         username: req.body.username, // Passed from React state
         text: req.body.text,
        };

      post.comments.push(newComment);
      await post.save();
      res.status(200).json(post);
      } catch (err) {
      res.status(500).json(err);
      }
    });

    // route to get a single post
    router.get('/:id', async (req, res) => {
      try {
      const post = await Post.findById(req.params.id)
        .populate('user', 'username')
        .populate('comments.user', 'username'); // Show names of commenters too
      res.status(200).json(post);
      } catch (err) {
      res.status(500).json(err);
      }
    });

module.exports = router;