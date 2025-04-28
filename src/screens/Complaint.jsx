import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

// Mapping of subcategory to main category
const SUBCATEGORY_TO_MAIN = {
  "Broken Hydrants": "Water",
  "Contaminated Water": "Water",
  "Damaged Benches": "Infrastructure",
  "Damaged Roads": "Infrastructure",
  "Damaged Transformer": "Electricity",
  "Dead Animals": "Sanitation",
  "Dirty Toilets": "Sanitation",
  "Fire Hazard": "Fire Safety",
  Graffiti: "Public Property",
  "Open Manholes": "Sanitation",
  Potholes: "Infrastructure",
  "Public Taps": "Water",
  Streetlights: "Electricity",
  Traffic: "Traffic Management",
};

const MAP_ID = "9b318e0a8ebafb31";
const GOOGLE_MAPS_API_KEY = "AIzaSyCVVUOwJvbvdRpiugIVc-2TIDM4W8S6Vdc";

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
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [predictLoading, setPredictLoading] = useState(false);
  const [postLoading, setPostLoading] = useState(false);
  const [predictError, setPredictError] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const fileInputRef = useRef();

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  // Get live location
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
        () => {
          setError("Failed to fetch location.");
        }
      );
    }
  }, []);

  // Handle image selection and prediction
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setFormData({
      mainCategory: "",
      subCategory: "",
      description: "",
      imageFile: file,
    });
    setImagePreview(file ? URL.createObjectURL(file) : null);
    setPredictError("");
    setPredictLoading(true);

    if (!file) {
      setPredictLoading(false);
      return;
    }

    try {
      const formDataData = new FormData();
      formDataData.append("image", file);

      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        body: formDataData,
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Prediction failed");
      }

      const result = await response.json();
      const subCategory = result.label;
      const mainCategory = SUBCATEGORY_TO_MAIN[subCategory] || "";

      setFormData((prev) => ({
        ...prev,
        mainCategory,
        subCategory,
      }));
    } catch (error) {
      setPredictError(error.message);
    } finally {
      setPredictLoading(false);
    }
  };

  // Convert file to base64
  const convertToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setPostLoading(true);
    if (postLoading) return; // Prevent double submission

    if (!formData.imageFile) {
      setError("Please select an image.");
      return;
    }
    if (!formData.mainCategory || !formData.subCategory) {
      setError("Please wait for image analysis to complete.");
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

      await axios.post("http://localhost:5000/api/posts/create", postData, {
        withCredentials: true,
      });
      setPostLoading(false);
      alert("Post created successfully!");
      setFormData({
        mainCategory: "",
        subCategory: "",
        description: "",
        imageFile: null,
      });
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      navigate("/all-complaints");
    } catch {
      setError("Failed to create post. Please try again.");
    }
  };

  // UI
  return (
    <div className="min-h-screen bg-[#f4f4f4] flex items-center justify-center px-4 py-8 mt-10">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-lg p-8 border-t-[6px] border-[#FF7F32]">
        <h2 className="text-3xl font-extrabold text-[#2C2C2C] text-center mb-2">
          Report an Issue
        </h2>
        <p className="text-center text-gray-600 mb-6 text-sm">
          Please select an image of the issue first. We'll analyze it and fill
          the category for you.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Step 1: Image upload */}
          <div className="flex flex-col items-center gap-2">
            <label
              htmlFor="image-upload"
              className="cursor-pointer flex flex-col items-center justify-center bg-gray-50 border-2 border-dashed border-[#FF7F32] rounded-lg w-48 h-48 hover:bg-orange-50 transition"
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="rounded-lg max-h-44 object-contain"
                  style={{ maxWidth: "100%" }}
                />
              ) : (
                <>
                  <span className="text-5xl text-gray-300 mb-2">📷</span>
                  <span className="text-gray-400 text-sm text-center">
                    Click to select image
                  </span>
                </>
              )}
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                ref={fileInputRef}
                className="hidden"
                disabled={predictLoading}
              />
            </label>
            {predictLoading && (
              <div className="flex flex-col items-center mt-2">
                <svg
                  className="animate-spin h-6 w-6 text-[#FF7F32]"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="#FF7F32"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="#FF7F32"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                <span className="text-xs text-[#FF7F32] mt-1">
                  Analyzing image, please wait…
                </span>
              </div>
            )}
            {predictError && (
              <p className="text-xs text-red-600 bg-red-100 px-3 py-1 rounded mt-2 text-center">
                {predictError}
              </p>
            )}
          </div>

          {/* Step 2: Show map only after image is selected */}
          {imagePreview && (
            <div className="w-full h-48 rounded-lg overflow-hidden border border-gray-200 mb-2">
              {isLoaded && location.coordinates.length === 2 ? (
                <GoogleMap
                  mapContainerStyle={{ width: "100%", height: "100%" }}
                  center={{
                    lat: Number(location.coordinates[1]),
                    lng: Number(location.coordinates[0]),
                  }}
                  zoom={16}
                  options={{ mapId: MAP_ID, disableDefaultUI: true }}
                >
                  <Marker
                    position={{
                      lat: Number(location.coordinates[1]),
                      lng: Number(location.coordinates[0]),
                    }}
                  />
                </GoogleMap>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  Loading map...
                </div>
              )}
            </div>
          )}

          {/* Step 3: Category fields auto-filled and readonly */}
          <div className="flex gap-2">
            <input
              type="text"
              name="mainCategory"
              placeholder="Main Category"
              value={formData.mainCategory}
              readOnly
              required
              className="flex-1 border border-gray-300 rounded-full px-5 py-3 focus:ring-2 focus:ring-[#FF7F32] outline-none text-sm bg-gray-100 cursor-not-allowed"
            />
            <input
              type="text"
              name="subCategory"
              placeholder="Subcategory"
              value={formData.subCategory}
              readOnly
              required
              className="flex-1 border border-gray-300 rounded-full px-5 py-3 focus:ring-2 focus:ring-[#FF7F32] outline-none text-sm bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Step 4: Description */}
          <textarea
            name="description"
            placeholder="Describe the issue (required)"
            value={formData.description}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
            required
            rows={3}
            className="w-full border border-gray-300 rounded-xl px-5 py-3 focus:ring-2 focus:ring-[#FF7F32] outline-none text-sm resize-none"
            disabled={
              !formData.mainCategory || !formData.subCategory || predictLoading
            }
          />

          {/* Step 5: Location */}
          {imagePreview && (
            <div className="text-xs text-gray-600 text-center mb-2">
              <strong>Location:</strong>{" "}
              {location.coordinates.length > 0
                ? location.address
                : "Fetching location..."}
            </div>
          )}

          {/* Step 6: Error */}
          {error && (
            <p className="text-sm text-red-600 bg-red-100 px-4 py-2 rounded-md text-center">
              {error}
            </p>
          )}

          {/* Step 7: Submit */}
          {postLoading && (
            <div className="flex flex-col items-center mt-2">
              <svg
                className="animate-spin h-6 w-6 text-[#FF7F32]"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="#FF7F32"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="#FF7F32"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
              <span className="text-xs text-[#FF7F32] mt-1">
                Submitting post, please wait…
              </span>
            </div>
          )}
          {!postLoading && (
            <button
              type="submit"
              className="w-full bg-[#FF7F32] hover:bg-[#FF5F20] text-white font-medium py-3 rounded-full transition duration-300 text-sm mt-2"
              disabled={
                !formData.imageFile ||
                !formData.mainCategory ||
                !formData.subCategory ||
                predictLoading
              }
            >
              Submit Post
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Complaint;
