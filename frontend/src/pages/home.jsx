import { useEffect, useState } from "react";
import homebg from "../assets/travel_go_bg.jpeg";
import flight from "../assets/flight.jpg";
import location from "../assets/location.avif";
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
      <div className="my-2">
        <h1 className="font-bold text-4xl">Plan your trip with confidence</h1>
        <h1>
          Were here to help you plan and book your next trip with Travel Go. You
          can search for flights, hotels, and beautiful locations all in one
          place.
        </h1>
      </div>
      <div className="my-3 grid grid-cols-2 gap-3 md:grid-cols-3">
        <Link className="my-2" to={"/flights"}>
          <img
            className="h-44 rounded-lg w-full object-cover"
            src={flight}
            alt=""
            srcSet=""
          />
          <h1>Flights </h1>
        </Link>
        <Link className="my-2" to={"/locations"}>
          <img
            className="h-44 rounded-lg w-full object-cover"
            src={location}
            alt=""
            srcSet=""
          />
          <h1>Locations </h1>
        </Link>
      </div>
      <>
        <h1 className="text-xl font-bold mb-2">Top Locations</h1>
        {places ? (
          <div className="allplaces justify-between items-center flex flex-nowrap overflow-x-auto">
            {places.map((place) => (
              <Link
                to={`/place/${place._id}`}
                key={place._id} // Add the key prop here
                className="flex flex-col items-center  rounded-lg flex-shrink-0 mx-2"
              >
                <img
                  className="h-40 w-56 object-cover rounded-lg"
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
      </>
    </div>
  );
}
