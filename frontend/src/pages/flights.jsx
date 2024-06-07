import axios from "axios";
import { useEffect, useState } from "react";

export default function Flights() {
  const [flights, setFlights] = useState([]);
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await axios.get("/flights");
        setFlights(response.data);
      } catch (error) {
        console.error("Error fetching flights:", error);
        setError("Failed to fetch flights");
      }
    };

    const userdata = JSON.parse(localStorage.getItem("user"));
    if (userdata && userdata.user && userdata.user._id) {
      setUserId(userdata.user._id);
    } else {
      setError("User data not found");
    }

    fetchFlights();
  }, []);

  const addToPackage = async (flightId) => {
    if (!userId) {
      setError("User ID not found");
      return;
    }

    try {
      await axios.post(`/flightpackage/${userId}`, { flightId });
      alert("Flight added to package successfully");
    } catch (error) {
      console.error("Error adding flight to package:", error);
      setError("Failed to add flight to package");
    }
  };

  console.log(error);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-light dark:bg-dark text-dark dark:text-light shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-4">Available Flights</h2>

      {flights.length > 0 ? (
        <div className="space-y-4">
          {flights.map((flight) => (
            <div key={flight._id} className="p-4 border rounded-md shadow-sm">
              <p className="text-lg font-medium">
                Flight Number: {flight.flightNumber}
              </p>
              <p>Departure City: {flight.departureCity}</p>
              <p>Arrival City: {flight.arrivalCity}</p>
              <p>
                Departure Date:{" "}
                {new Date(flight.departureDate).toLocaleDateString()}
              </p>
              <p>
                Arrival Date:{" "}
                {new Date(flight.arrivalDate).toLocaleDateString()}
              </p>
              <p>Additional Information: {flight.additionalInfo}</p>
              <button
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                onClick={() => addToPackage(flight._id)}
              >
                Add to Package
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No flights available.</p>
      )}
    </div>
  );
}
