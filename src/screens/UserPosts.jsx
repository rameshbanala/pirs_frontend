import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaThumbsUp } from 'react-icons/fa';

const UserPosts = ({ username }) => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [commentText, setCommentText] = useState({});
  const [loadingLike, setLoadingLike] = useState(null);

  // Fetch posts for the specific user
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/posts/user/${username}`, {
          withCredentials: true, // 👈 this tells axios to send cookies
        });
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [username]);


   const handleLike = async (postId) => {
      try {
        setLoadingLike(postId);
        const res = await axios.post(
          `http://localhost:5000/api/posts/like/${postId}`,
          {}, {
          withCredentials: true,
        });
  
        setPosts(prev =>
          prev.map(post =>
            post._id === postId ? { ...post, likes: res.data } : post
          )
        );
      } catch (error) {
        console.error('Like/Unlike Error:', error);
      } finally {
        setLoadingLike(null);
      }
    };  
    const handleComment = async (postId) => {
      try {
        const text = commentText[postId];
        if (!text) return;
  
        const res = await axios.post(`http://localhost:5000/api/posts/comment/${postId}`, {
          text
        }, {
          withCredentials: true,
        });
  
        setPosts(prev =>
          prev.map(post =>
            post._id === postId ? { ...post, comments: res.data.comments } : post
          )
        );
  
        setCommentText(prev => ({ ...prev, [postId]: '' }));
      } catch (error) {
        console.error('Comment Error:', error);
      }
    };

  // Handle deleting a post
  const handleDelete = async (postId) => {
    try {
      await axios.delete(`http://localhost:5000/api/posts/${postId}`, {
        withCredentials: true, // Ensure cookies (with JWT) are included
      });
      // Refetch posts after deletion
      const response = await axios.get(`http://localhost:5000/api/posts/user/${username}`, {
        withCredentials: true, // Make sure cookies are sent here too
      });
      setPosts(response.data); // Update the state with the new list of posts
    } catch (error) {
      console.error('Error deleting the post:', error.response ? error.response.data : error);
    }
  };
  

  // Close popup
  const closePopup = () => {
    setSelectedPost(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-white py-10 px-4 sm:px-8 mt-8">
      <h1 className="text-3xl font-bold text-orange-600 text-center mb-10">All Issue Complaints</h1>
      <div className="grid gap-7 md:grid-cols-3 lg:grid-cols-4">
        {posts.map((post) => (
          <div key={post._id} className="bg-white shadow-lg rounded-2xl p-4 border-l-4 border-orange-500">
            <img
              src={post.imageUrl}
              alt="issue"
              className="rounded-xl w-full h-52 object-cover mb-4"
            />
            <div className="mb-2">
              <span className="font-semibold text-orange-700">{post.labels.mainCategory}</span>
              <span className="text-sm text-gray-500"> / {post.labels.subCategory}</span>
            </div>
            <p className="text-sm text-gray-600 mb-2">
              <strong>Location:</strong> {post.location.address}
            </p>
            <p className="text-gray-800 mb-2">{post.description}</p>
            <p className="text-sm text-gray-500 mb-1">
              <strong>Posted by:</strong> {post.user?.fullName}
            </p>

            {/* Show Status */}
            <p className="text-sm text-gray-500 mb-2">
              <strong>Status:</strong> {post.status}
            </p>

            {/* Like Button with icon */}
            <button
              onClick={() => handleLike(post._id)}
              className={`mt-2 px-4 py-1 rounded-md text-white text-sm ${loadingLike === post._id ? 'bg-gray-400' : post.likes.includes(post.user._id) ? 'bg-red-500' : 'bg-orange-500'} transition`}
              disabled={loadingLike === post._id}
            >
              <FaThumbsUp className="inline mr-2" />
              {post.likes.length}
            </button>

            {/* Delete and Update Buttons */}
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => handleDelete(post._id)}
                className="bg-red-500 text-white px-4 py-1 rounded-md text-sm hover:bg-red-600"
              >
                Delete
              </button>
              
            </div>

            {/* Click on card to show popup */}
            <button
              onClick={() => setSelectedPost(post)}
              className="mt-3 text-orange-600 hover:underline text-sm"
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* Popup Window */}
      {selectedPost && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-600 bg-opacity-50 z-50">
          <div className="relative bg-white p-5 rounded-xl w-[90%] max-w-md shadow-lg">
            {/* 'X' Button inside the popup */}
            <button
              onClick={closePopup}
              className="absolute top-3 right-3 text-xl font-bold text-gray-600 hover:text-red-600"
            >
              ×
            </button>

            <h2 className="text-xl font-semibold text-orange-600 mb-3 text-center">Post Details</h2>
            <img
              src={selectedPost.imageUrl}
              alt="issue"
              className="rounded-lg w-full h-48 object-cover mb-3"
            />
            <p className="text-gray-800 text-sm mb-2">{selectedPost.description}</p>
            <p className="text-xs text-gray-500 mb-1">
              <strong>Location:</strong> {selectedPost.location.address}
            </p>
            <p className="text-xs text-gray-500 mb-1">
              <strong>Posted by:</strong> {selectedPost.user?.fullName}
            </p>
            <p className="text-xs text-gray-500 mb-1">
              <strong>Category:</strong> {selectedPost.labels.mainCategory} / {selectedPost.labels.subCategory}
            </p>
            <p className="text-xs text-gray-500 mb-2">
              <strong>Status:</strong> {selectedPost.status}
            </p>

            {/* Comments */}
            <div className="mt-2">
              <strong className="text-sm text-orange-700">Comments:</strong>
              {selectedPost.comments?.length > 0 ? (
                <ul className="text-sm text-gray-700 list-disc list-inside mt-1 max-h-24 overflow-y-auto pr-2">
                  {selectedPost.comments.map((c) => (
                    <li key={c._id} className="mb-1">
                      <strong>{c.user?.fullName}: </strong>{c.text}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-400 mt-1">No comments yet.</p>
              )}
              {/* Comment Input in Popup */}
              <div className="mt-3 flex flex-col">
                <textarea
                  rows={2}
                  placeholder="Add a comment..."
                  value={commentText[selectedPost._id] || ''}
                  onChange={(e) => setCommentText({ ...commentText, [selectedPost._id]: e.target.value })}
                  className="border border-orange-300 rounded-md p-2 text-sm mb-2 resize-none"
                />
                <button
                  onClick={() => handleComment(selectedPost._id)}
                  className="bg-orange-500 text-white text-sm px-3 py-1 rounded hover:bg-orange-600 self-end"
                >
                  Add Comment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPosts;
