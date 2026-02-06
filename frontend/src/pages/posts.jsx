import React, { useState, useEffect, useCallback } from 'react';
import Button from 'react-bootstrap/Button';
import '../style/posts.css';
import { useNavigate } from 'react-router-dom';


const SocialPage = () => {
  const [posts, setPosts] = useState([]);
  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";


  // Fextch all posts
  const fetchPosts = useCallback(async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/posts/all`);

      if (!res.ok) {
        console.error("Failed to fetch posts:", res.status, res.statusText);
        return;
      }

      const data = await res.json();

      //  ensure data is an array before setting it
      if (Array.isArray(data)) {
        setPosts(data);
      } else {
        console.error("API returned non-array data:", data);
        setPosts([]);
      }
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  }, []);

  useEffect(() => {

    fetchPosts();
  }, [fetchPosts]);

  //  create new post
  const handlePostSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('userToken');

    const response = await fetch(`${BASE_URL}/api/posts/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify({ text, image: imageUrl })
    });

    if (response.ok) {
      setText("");
      setImageUrl("");
      fetchPosts();
    }
  };
  // LIKE / UNLIKE A POST
  const handleLike = async (postId) => {
    const token = localStorage.getItem('userToken');

    await fetch(`${BASE_URL}/api/posts/${postId}/like`, {
      method: 'PUT',
      headers: { 'Authorization': token }
    });
    fetchPosts(); // Refresh the feed to show the updated heart count
  };


  // logout function
  const handleLogout = () => {
    localStorage.removeItem('userToken');
    navigate('/login');
  };

  // Get current user's name for greeting
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
  const currentUser = userInfo.username || "User";

  return (
    <div className="container-social">
      {/* Welcome & Logout  */}
      <div className="social-header"  >
        <h4>Welcome, {currentUser}! </h4>
        <Button className="mb-3" variant="danger" onClick={handleLogout}>Logout</Button>
      </div>

      {/* create post  */}

      <div className="create-post-card">
        <h2>Create Post</h2>
        <textarea
          placeholder="What's on your mind?"
          value={text}
          onChange={(e) => setText(e.target.value)}
        /><br></br>
        <input
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        /><br></br>
        <Button className="btn" variant="primary"
          onClick={handlePostSubmit}>Post</Button>
      </div>

      <hr />

      {/*  show posts  */}
      <div className="feed">
        {posts.map((post) => (
          <div key={post._id} className="post-card">
            <h4>@{post.user.username || "Unknown User"}</h4>
            <p>{post.content.text}</p>
            {post.content.image && <img src={post.content.image} alt="post" />}
            <div className="interactions">
              <span className='like-btn' onClick={() => handleLike(post._id)}  >{post.likes.length} Likes</span>
              <span onClick={() => navigate(`/post/${post._id}`)} >{post.comments.length} Comments</span>

            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default SocialPage;