import { useEffect, useState } from "react";
import homebg from "../assets/travel_go_bg.jpeg";
import axios from "axios";
import { Link } from "react-router-dom";

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
    <div>
      <div className="flex items-center justify-center">
        <div className="relative w-full h-96 m-10 rounded-xl">
          <img
            className="object-cover w-full h-96 rounded-xl"
            src={homebg}
            alt="Travel background"
          />
        </div>
      </div>
      <div className="allplaces m-10 grid gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {places.map((place) => (
          <Link
            to={`/places/${place._id}`}
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
            <h1 className="mt-1 w-full text-lefy  text-md">{place.location}</h1>
            <h1 className="w-full text-left">${place.price}/night</h1>
          </Link>
        ))}
      </div>
    </div>
  );
}
