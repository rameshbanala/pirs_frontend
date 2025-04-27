import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useLoadScript,
} from "@react-google-maps/api";

const LIBRARIES = ["places"];
const MAP_ID = "9b318e0a8ebafb31";

// SVG path for Material Design "place" marker
const MAP_MARKER_PATH =
  "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z";

const MapWithPosts = ({ containerHeight = "100vh", zoomLevel = 10 }) => {
  const [posts, setPosts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 20.5937, lng: 78.9629 });

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCVVUOwJvbvdRpiugIVc-2TIDM4W8S6Vdc",
    libraries: LIBRARIES,
  });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/posts/locations", {
          credentials: "include",
        });
        const data = await res.json();
        const validPosts = data.filter(
          (post) =>
            post?.location?.coordinates?.length === 2 &&
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
      options={{ mapId: MAP_ID }}
    >
      {posts.map((post) => {
        const [lng, lat] = post.location.coordinates;
        // Color based on ownership
        const fillColor = post.isUserPost ? "#4CAF50" : "#4285F4"; // green for user, blue for others
        const strokeColor = post.isUserPost ? "#388E3C" : "#1A237E";
        return (
          <Marker
            key={post._id}
            position={{ lat: Number(lat), lng: Number(lng) }}
            onClick={() => setSelected(post)}
            icon={{
              path: MAP_MARKER_PATH,
              fillColor,
              fillOpacity: 1,
              strokeColor,
              strokeWeight: 2,
              scale: 2,
              anchor: { x: 12, y: 24 }, // Center bottom for 24x24 icon
            }}
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
            <h4 className="text-base font-semibold mb-2 capitalize">
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
