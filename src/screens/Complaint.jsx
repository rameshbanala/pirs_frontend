import React, { useState, useEffect } from "react";
import axios from "axios";

const Complaint = () => {
  const [formData, setFormData] = useState({
    mainCategory: "",
    subCategory: "",
    description: "",
    imageFile: null,
  });

  const [location, setLocation] = useState({
    type: "Point",
    coordinates: [],
    address: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setLocation((prev) => ({
            ...prev,
            coordinates: [lng, lat],
            address: `Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`,
          }));
        },
        (error) => {
          console.error("Location error:", error);
          setError("Failed to fetch location.");
        }
      );
    }
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e) => {
    setFormData((prev) => ({ ...prev, imageFile: e.target.files[0] }));
  };

  const convertToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.imageFile) {
      setError("Please select an image.");
      return;
    }

    try {
      const base64Image = await convertToBase64(formData.imageFile);

      const postData = {
        image: base64Image,
        labels: {
          mainCategory: formData.mainCategory,
          subCategory: formData.subCategory,
        },
        location,
        description: formData.description,
      };

      const res = await axios.post("http://localhost:5000/api/posts/create", postData, {
        withCredentials: true,
      });

      alert("Post created successfully!");
      console.log("Server response:", res.data);

      // Optionally reset form
      setFormData({
        mainCategory: "",
        subCategory: "",
        description: "",
        imageFile: null,
      });
    } catch (err) {
      console.error("Error:", err);
      setError("Failed to create post. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f4f4] flex items-center justify-center px-4 py-8 mt-10">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-10 border-t-[6px] border-[#FF7F32]">
        <h2 className="text-3xl font-extrabold text-[#2C2C2C] text-center mb-2">
          Create a New Post
        </h2>
        <p className="text-center text-gray-600 mb-6 text-sm">
          Upload an issue you're facing with details and location.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="mainCategory"
            placeholder="Main Category"
            value={formData.mainCategory}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-full px-5 py-3 focus:ring-2 focus:ring-[#FF7F32] outline-none text-sm"
          />

          <input
            type="text"
            name="subCategory"
            placeholder="Subcategory"
            value={formData.subCategory}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-full px-5 py-3 focus:ring-2 focus:ring-[#FF7F32] outline-none text-sm"
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={3}
            className="w-full border border-gray-300 rounded-xl px-5 py-3 focus:ring-2 focus:ring-[#FF7F32] outline-none text-sm resize-none"
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
            className="w-full border border-gray-300 rounded-full px-5 py-2 focus:ring-2 focus:ring-[#FF7F32] outline-none text-sm"
          />

          <div className="text-sm text-gray-600 text-center">
            <strong>Location:</strong>{" "}
            {location.coordinates.length > 0
              ? location.address
              : "Fetching location..."}
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-100 px-4 py-2 rounded-md text-center">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-[#FF7F32] hover:bg-[#FF5F20] text-white font-medium py-3 rounded-full transition duration-300 text-sm"
          >
            Submit Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default Complaint;
