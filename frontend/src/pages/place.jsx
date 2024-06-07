import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/loader";

export default function Place() {
  const { placeId } = useParams();

  const [place, setPlace] = useState(null);
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userdata = JSON.parse(localStorage.getItem("user"));
    if (userdata && userdata.user && userdata.user._id) {
      setUserId(userdata.user._id);
    }
  }, []);

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const response = await axios.get(`/place/${placeId}`);
        setPlace(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPlace();
  }, [placeId]);

  useEffect(() => {
    if (place && place.userId) {
      const fetchUser = async () => {
        try {
          const response = await axios.get(`/user/${place.userId}`);
          setUser(response.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchUser();
    }
  }, [place]);

  const addToPackage = async () => {
    try {
      const response = await axios.post("/placepackage", {
        userId,
        placeId,
      });
      console.log("Package updated:", response.data);
      alert("Added");
    } catch (error) {
      console.error("Error adding product to package:", error);
    }
  };

  return (
    <div className="m-3 md:m-6 lg:m-10">
      {place && user ? (
        <div>
          <div className="relative rounded-xl w-full h-96">
            <img
              className="rounded-xl object-cover w-full h-96"
              src={place.imgurl}
              alt={place.name}
            />
            <div className="flex items-center justify-center m-2 p-1 rounded-xl absolute bottom-0 left-0 bg-gray-900 text-light backdrop-blur-xl">
              <div className="h-6 w-6">
                <img
                  className="rounded-full opacity-100 h-6 w-6"
                  src={user.profimgurl}
                  alt={user.name}
                />
              </div>
              <h1 className="mx-2">{user.name}</h1>
            </div>
          </div>
          <div className="mt-3">
            <div className="flex flex-col sm:flex-row justify-between">
              <h1 className="text-xl font-bold">{place.name}</h1>
              <h1>{place.category}</h1>
            </div>
            <h1>{place.description}</h1>
            <h1 className="text-xl font-bold">₹ {place.price}</h1>
          </div>
          <button onClick={addToPackage}> Add To Package</button>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}
