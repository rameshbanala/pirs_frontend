import React, { useState, useEffect } from "react";
import axios from "axios";
import { Dialog } from "@headlessui/react";
import UserPosts from "./UserPosts"; // import the UserPosts component

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    username: "",
    link: "",
    profileImg: "",
    currentPassword: "",
    newPassword: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/auth/me", { withCredentials: true })
      .then((res) => {
        setUser(res.data);
        setFormData({
          fullName: res.data.fullName,
          email: res.data.email,
          username: res.data.username,
          link: res.data.link || "",
          profileImg: res.data.profileImg || "",
          currentPassword: "",
          newPassword: "",
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const convertToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await convertToBase64(file);
      setFormData({ ...formData, profileImg: base64 });
    }
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/update",
        formData,
        { withCredentials: true }
      );
      setUser(res.data);
      setIsOpen(false);
    } catch (err) {
      alert(err.response?.data?.error || "Update failed");
    }
  };

  if (loading) return <div className="text-center mt-10 text-orange-500">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white py-10 px-4 sm:px-8">
      <h1 className="text-3xl font-bold text-orange-600 text-center mb-10">My Profile</h1>

      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-md border-l-4 border-orange-500 p-6">
        <div className="flex items-center gap-4 mb-4">
          <img
            src={user.profileImg || "/default-profile.png"}
            alt="Profile"
            className="w-24 h-24 rounded-full border border-orange-300 object-cover"
          />
          <div>
            <h2 className="text-xl font-semibold text-orange-700">{user.fullName}</h2>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-sm text-gray-400">@{user.username}</p>
          </div>
        </div>

        <p className="text-sm text-gray-700">Link: {user.link || "-"}</p>

        <button
          className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-full"
          onClick={() => setIsOpen(true)}
        >
          Edit Profile
        </button>
      </div>

      {/* User Posts Section */}
      <div className="mt-10">
        <UserPosts username={user.username} />
      </div>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md bg-white p-6 rounded-xl shadow-xl relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-4 text-xl text-gray-400 hover:text-black"
            >
              &times;
            </button>
            <Dialog.Title className="text-lg font-semibold text-orange-600 mb-4">Edit Profile</Dialog.Title>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full border rounded p-2"
              />
              <input
                type="text"
                placeholder="Username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="w-full border rounded p-2"
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full border rounded p-2"
              />
              <input
                type="text"
                placeholder="Link"
                value={formData.link}
                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                className="w-full border rounded p-2"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full border rounded p-2"
              />
              <input
                type="password"
                placeholder="Current Password (if changing password)"
                value={formData.currentPassword}
                onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                className="w-full border rounded p-2"
              />
              <input
                type="password"
                placeholder="New Password (optional)"
                value={formData.newPassword}
                onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                className="w-full border rounded p-2"
              />

              <button
                onClick={handleUpdate}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-full"
              >
                Save Changes
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default ProfilePage;
