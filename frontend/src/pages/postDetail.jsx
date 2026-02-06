import { useParams } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import '../style/PostDetails.css';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [commentText, setCommentText] = useState("");
  const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

  const fetchSinglePost = useCallback(async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/posts/${id}`);
      if (res.ok) {
        const data = await res.json();
        setPost(data);
      } else {
        console.error("Failed to fetch post");
      }
    } catch (err) {
      console.error("Error fetching post:", err);
    }
  }, [id]);

  useEffect(() => { fetchSinglePost(); }, [fetchSinglePost]);

  const handleComment = async () => {
    if (!commentText.trim()) return;


    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    const username = userInfo.username || "Unknown";

    const token = localStorage.getItem('userToken');

    await fetch(`${BASE_URL}/api/posts/${id}/comment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': token },
      body: JSON.stringify({
        text: commentText,
        username: username
      })
    });
    setCommentText("");
    fetchSinglePost();
  };

  if (!post) return <div className="loading-screen">Loading post...</div>;

  return (
    <div className="post-details-container">
      {/* Original posts */}
      <div className="original-post">
        {/* Safety check for user.username */}
        <h3>@{post.user?.username || "Unknown User"}</h3>
        <p>{post.content.text}</p>
        {/* Conditionally render image if it exists */}
        {post.content.image && <img src={post.content.image} alt="post content" />}
      </div>

      {/* comments section */}
      <div className="comments-section">
        <h4>Comments ({post.comments.length})</h4>

        <div className="comments-list">
          {post.comments.length === 0 && <p className="no-comments">No comments yet. Be the first!</p>}

          {post.comments.map(c => (
            <div key={c._id} className="comment-card">
              <div className="comment-header">
                <span className="comment-author">@{c.username || "Anonymous"}</span>
                {/* Optional: Add date here if you want */}
              </div>
              <div className="comment-text">{c.text}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Comment inpt */}
      <div className="add-comment">
        <input
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Write a comment..."
          onKeyDown={(e) => e.key === 'Enter' && handleComment()}
        />
        <button onClick={handleComment}>Post</button>
      </div>
    </div>
  );
};

export default PostDetail;
