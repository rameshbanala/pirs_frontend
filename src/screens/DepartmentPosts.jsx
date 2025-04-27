import React, { useEffect, useState } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

const DepartmentPosts = ({ department }) => {
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    fetchDepartmentPosts();
  }, [department]);

  const fetchDepartmentPosts = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/posts/department/${department}`);
      setPosts(res.data);
    } catch (error) {
      console.error("Error fetching department posts:", error);
    }
  };

  const handleUpdateClick = (postId) => {
    setSelectedPostId(postId);
    setShowModal(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!imageFile) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result;
      setIsUploading(true);

      try {
        await axios.post(
          `http://localhost:5000/api/posts/update/${selectedPostId}`,
          { resolvedImage: base64Image },
          { withCredentials: true }
        );

        toast.success("Image uploaded successfully!");
        setShowModal(false);
        setImageFile(null);
        setPreviewUrl(null);
        setSelectedPostId(null);
        fetchDepartmentPosts();
      } catch (error) {
        toast.error("Failed to upload image!");
        console.error("Error uploading resolved image:", error);
      } finally {
        setIsUploading(false);
      }
    };

    reader.readAsDataURL(imageFile);
  };

  return (
    <>
      <Toaster position="top-center" />

      <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div
            key={post._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-4"
          >
            <img
              src={post.imageUrl}
              alt="post"
              className="w-full h-52 object-cover rounded-xl mb-4"
            />

            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-gray-800">{post.labels.mainCategory}</h2>
              <p className="text-sm text-gray-600 italic">{post.labels.subCategory}</p>
              <p className="text-gray-700">{post.description}</p>
              <p
                className={`text-xs ${
                  post.status === "resolved" ? "text-green-600 font-bold" : "text-gray-400"
                }`}
              >
                Status: {post.status}
              </p>
              <p className="text-xs text-gray-500">
                Posted by: <span className="font-medium">{post.user?.fullName}</span>
              </p>
            </div>

            <button
              className={`mt-4 w-full ${
                post.status === "resolved"
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              } text-white font-medium py-2 px-4 rounded-xl transition duration-200`}
              onClick={() => handleUpdateClick(post._id)}
              disabled={post.status === "resolved"}
            >
              Update
            </button>
          </div>
        ))}

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 transition-all">
            <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl space-y-4 animate-fade-in">
              <h2 className="text-lg font-semibold text-gray-700">Upload Resolved Image</h2>

              <input type="file" accept="image/*" onChange={handleImageChange} />

              {previewUrl && (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg mt-2"
                />
              )}

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  onClick={() => {
                    setShowModal(false);
                    setImageFile(null);
                    setPreviewUrl(null);
                  }}
                  className="bg-gray-300 px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>

                <button
                  onClick={handleUpload}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                  disabled={isUploading}
                >
                  {isUploading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    "Upload"
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DepartmentPosts;
