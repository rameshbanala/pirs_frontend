import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useLoadScript,
} from "@react-google-maps/api";

const MapWithPosts = ({ containerHeight = "100vh", zoomLevel = 15 }) => {
  const [posts, setPosts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 28.6139, lng: 77.209 });

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCVVUOwJvbvdRpiugIVc-2TIDM4W8S6Vdc",
  });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/posts/locations", {
          credentials: "include",
        });
        const data = await res.json();
        console.log("Fetched posts:", data);

        const validPosts = data.filter(
          (post) =>
            post?.location?.coordinates &&
            Array.isArray(post.location.coordinates) &&
            !isNaN(post.location.coordinates[0]) &&
            !isNaN(post.location.coordinates[1])
        );

        setPosts(validPosts);

        if (validPosts.length > 0) {
          const [lng, lat] = validPosts[0].location.coordinates;
          setMapCenter({ lat: Number(lat), lng: Number(lng) });
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: containerHeight }}
      zoom={zoomLevel}
      center={mapCenter}
    >
      {posts.map((post) => {
        const [lng, lat] = post.location.coordinates;

        return (
          <Marker
            key={post._id}
            position={{ lat: Number(lat), lng: Number(lng) }}
            onClick={() => setSelected(post)}
          />
        );
      })}

      {selected && (
        <InfoWindow
          position={{
            lat: Number(selected.location.coordinates[1]),
            lng: Number(selected.location.coordinates[0]),
          }}
          onCloseClick={() => setSelected(null)}
        >
          <div style={{ maxWidth: "250px", textAlign: "center" }}>
            <h4 className="text-base font-semibold mb-2">
              {selected.labels?.mainCategory || "No Category"} -{" "}
              {selected.labels?.subCategory || "No Subcategory"}
            </h4>
            {selected.imageUrl && (
              <img
                src={selected.imageUrl}
                alt="Post"
                className="w-full h-32 object-cover rounded-md mb-2"
              />
            )}
            <p className="text-sm">
              {selected.description || "No description."}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {selected.location?.address || "No address available"}
            </p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

export default MapWithPosts;
