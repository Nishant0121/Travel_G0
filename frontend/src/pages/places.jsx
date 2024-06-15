import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../components/loader";
import { Link } from "react-router-dom";

export default function Places() {
  const [places, setPlaces] = useState("");
  useEffect(() => {
    const fetchPlaces = async () => {
      const response = await axios.get("/places");
      setPlaces(response.data);
    };

    fetchPlaces();
  }, []);

  console.log(places);
  return (
    <div className=" mt-4">
      {places ? (
        <div className="allplaces grid gap-4 sm:grid-cols-2 grid-cols-1">
          {places.map((place) => (
            <Link
              to={`/place/${place._id}`}
              key={place._id} // Add the key prop here
              className="flex flex-col items-center  rounded-lg flex-shrink-0 mx-2"
            >
              <img
                className="h-60 w-full object-cover rounded-lg"
                src={place.imgurl}
                alt={place.name}
              />
              <h1 className="mt-1 w-full text-left font-bold text-xl">
                {place.name}
              </h1>
              <h1 className="mt-1 w-full text-left text-md">
                {place.location}
              </h1>
              <h1 className="w-full text-left">${place.price}/night</h1>
            </Link>
          ))}
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}
