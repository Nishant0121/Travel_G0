import { useEffect, useState } from "react";
import homebg from "../assets/travel_go_bg.jpeg";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../components/loader";

export default function Home() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const fetchPlaces = async () => {
      const response = await axios.get("/places");
      setPlaces(response.data);
    };

    fetchPlaces();
  }, []);

  console.log(places);
  return (
    <div className="m-3 md:m-6 lg:m-10">
      <div className="flex items-center mb-8 justify-center">
        <div className="relative w-full h-96 rounded-xl">
          <img
            className="object-cover w-full h-96 rounded-xl"
            src={homebg}
            alt="Travel background"
          />
        </div>
      </div>
      <>
        {places ? (
          <div className="allplaces grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {places.map((place) => (
              <Link
                to={`/place/${place._id}`}
                key={place._id} // Add the key prop here
                className="flex flex-col items-center rounded-lg"
              >
                <img
                  className="h-40 w-full object-cover rounded-lg"
                  src={place.imgurl}
                  alt={place.name}
                />
                <h1 className="mt-1 w-full text-left font-bold text-xl">
                  {place.name}
                </h1>
                <h1 className="mt-1 w-full text-lefy  text-md">
                  {place.location}
                </h1>
                <h1 className="w-full text-left">${place.price}/night</h1>
              </Link>
            ))}
          </div>
        ) : (
          <Loader />
        )}
      </>
    </div>
  );
}
