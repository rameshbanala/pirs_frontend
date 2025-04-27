import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaThumbsUp } from 'react-icons/fa'; // Importing the thumbs-up icon

const Complaints = () => {
  const [posts, setPosts] = useState([]);
  const [commentText, setCommentText] = useState({});
  const [loadingLike, setLoadingLike] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null); // To handle the selected post for the popup

  useEffect(() => {
    fetchPosts();
  }, []);
  
  const fetchPosts = () => {
    axios.get('http://localhost:5000/api/posts/all', { withCredentials: true })
      .then(res => setPosts(res.data))
      .catch(err => console.error(err));
  };

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
      console.log('Updated posts:', posts);
    } catch (error) {
      console.error('Like/Unlike Error:', error);
    } finally {
      setLoadingLike(null);
    }
  };
  useEffect(()=>{
console.log('Posts:', posts);
  },[posts]);

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

  const closePopup = () => {
    setSelectedPost(null); // Close the popup
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-white py-10 px-4 sm:px-8 mt-8">
      <h1 className="text-3xl font-bold text-orange-600 text-center mb-10">All Issue Complaints</h1>
      <div className="grid gap-7 md:grid-cols-3 lg:grid-cols-4">
      {posts.map((post) => (
  <div key={post._id} className="bg-white shadow-lg rounded-2xl p-4 border-l-4 border-orange-500">
    
    {/* Before and After Image Display */}
    <div className="flex mb-4">
      {/* "Before" Image */}
      <div className={`${post.afterImageUrl ? 'w-1/2 pr-1' : 'w-full'}`}>
        <h3 className="text-lg font-semibold text-gray-800">Before</h3>
        <img
          src={post.imageUrl}
          alt="before issue"
          className="rounded-xl w-full h-52 object-cover"
        />
      </div>
      
      {/* "After" Image, only if it exists */}
      {post.afterImageUrl && (
        <div className="w-1/2 pl-1">
          <h3 className="text-lg font-semibold text-gray-800">After</h3>
          <img
            src={post.afterImageUrl}
            alt="after issue"
            className="rounded-xl w-full h-52 object-cover"
          />
        </div>
      )}
    </div>

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

      {/* Before and After Images */}
      <div className="flex mb-3">
        {/* Before Image */}
        <div className={`${selectedPost.afterImageUrl ? 'w-1/2 pr-1' : 'w-full'}`}>
          <h3 className="text-sm font-semibold text-gray-800 mb-1 text-center">Before</h3>
          <img
            src={selectedPost.imageUrl}
            alt="before issue"
            className="rounded-lg w-full h-48 object-cover"
          />
        </div>

        {/* After Image */}
        {selectedPost.afterImageUrl && (
          <div className="w-1/2 pl-1">
            <h3 className="text-sm font-semibold text-gray-800 mb-1 text-center">After</h3>
            <img
              src={selectedPost.afterImageUrl}
              alt="after issue"
              className="rounded-lg w-full h-48 object-cover"
            />
          </div>
        )}
      </div>

      {/* Post Details */}
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

      {/* Comments Section */}
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

        {/* Add Comment */}
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

export default Complaints;
