const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true, 
  },

  username: String,

  content: {
    text: { type: String },
    image: { type: String }
  },

  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // Array of User IDs who liked the post
  }],

  comments: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    username: String,
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  }],

  createdAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model('Post', PostSchema); 