import { useEffect, useState } from "react";
import axios from "axios";
import Delete from "../components/delete";
import flightimg from "../assets/flight.jpg";

export default function Package() {
  const [pack, setPack] = useState({});
  const [flightpack, setFlightPack] = useState({});
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [productIds, setProductIds] = useState([]);
  const [flightIds, setFlightIds] = useState([]);
  const [products, setProducts] = useState([]);
  const [flight, setFlight] = useState([]);
  const [placetotal, setPlaceTotal] = useState(0);
  const [flighttotal, setFlightTotal] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const userdata = JSON.parse(localStorage.getItem("user"));
    if (userdata && userdata.user && userdata.user._id) {
      setUserId(userdata.user._id);
      setUserName(userdata.user.name);
    } else {
      setError("User data not found");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const fetchPack = async () => {
      if (!userId) return;

      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`/package/${userId}`);
        setPack(response.data);
      } catch (error) {
        setError("Failed to fetch package data");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPack();
  }, [userId]);

  useEffect(() => {
    const fetchFlightPackage = async () => {
      if (!userId) return;

      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`/flightpackage/${userId}`);
        setFlightPack(response.data);
        if (response.data && response.data.products) {
          setFlightIds(response.data.products);
        }
      } catch (error) {
        setError("Failed to fetch flight package data");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchFlightPackage();
  }, [userId]);

  useEffect(() => {
    if (pack && pack.products) {
      setProductIds(pack.products);
    }
  }, [pack]);

  useEffect(() => {
    if (flightpack && flightpack.products) {
      setFlightIds(flightpack.products);
    }
  }, [flightpack]);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const productData = await Promise.all(
          productIds.map(async (productId) => {
            const response = await axios.get(`/place/${productId}`);
            return response.data;
          })
        );
        setProducts(productData);
        // Calculate total price
        const totalPrice = productData.reduce((accumulator, product) => {
          return accumulator + product.price;
        }, 0);
        setPlaceTotal(totalPrice);
      } catch (error) {
        console.error("Failed to fetch product data:", error);
      }
    };

    // Only fetch product data if there are product IDs available
    if (productIds.length > 0) {
      fetchProductData();
    }
  }, [productIds]);

  useEffect(() => {
    const fetchFlightData = async () => {
      try {
        const flightData = await Promise.all(
          flightIds.map(async (flightId) => {
            const response = await axios.get(`/flight/${flightId}`);
            return response.data;
          })
        );
        setFlight(flightData);
        const totalPrice = flightData.reduce((accumulator, flight) => {
          return accumulator + flight.price;
        }, 0);
        setFlightTotal(totalPrice);
      } catch (error) {
        console.error("Failed to fetch flight data:", error);
      }
    };

    if (flightIds.length > 0) {
      fetchFlightData();
    }
  }, [flightIds]);

  useEffect(() => {
    setTotal(placetotal + flighttotal);
  }, [placetotal, flighttotal]);

  const handleDeletePlace = async (productId) => {
    try {
      await axios.delete(`/pack/${pack._id}/place/${productId}`);
      setProductIds((prev) => prev.filter((id) => id !== productId));
      setProducts((prev) =>
        prev.filter((product) => product._id !== productId)
      );
      window.location.reload();
    } catch (error) {
      console.error("Failed to delete place:", error);
    }
  };

  const handleDeleteFlight = async (flightId) => {
    try {
      await axios.delete(`/fpack/${flightpack._id}/flight/${flightId}`);
      setFlightIds((prev) => prev.filter((id) => id !== flightId));
      setFlight((prev) => prev.filter((flight) => flight._id !== flightId));
      window.location.reload();
    } catch (error) {
      console.error("Failed to delete flight:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-semibold mb-4">Your Package</h2>
      <div className="border rounded-md p-4">
        <p className="font-semibold">Package ID: {pack._id}</p>
        <p className="font-semibold">User Name: {userName}</p>
        <ul className="mt-4">
          {products.map((product, index) => (
            <li
              key={index}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b py-2"
            >
              <div className="relative w-full">
                <img
                  className="static h-36 w-full object-cover rounded-lg"
                  src={product.imgurl}
                  alt=""
                />
                <button
                  className="bg-gray-700 px-2 py-1 backdrop-blur-sm rounded-lg absolute top-2 left-2"
                  onClick={() => handleDeletePlace(product._id)}
                >
                  <Delete />
                </button>
              </div>
              <div>
                <p className="font-semibold">Place</p>
                <p className="">Place Name: {product.name}</p>
                <p className="">Place Description: {product.description}</p>
                <p className="">Price: ₹{product.price.toFixed(2)}</p>
              </div>

              {/* Add more product details as needed */}
            </li>
          ))}
        </ul>
        <ul>
          {flight.map((flights, index) => (
            <li
              key={index}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b py-2"
            >
              <div className="relative w-full">
                <img
                  className="static h-36 w-full object-cover rounded-lg"
                  src={flightimg}
                  alt=""
                />
                <button
                  className="bg-gray-700 px-2 py-1 backdrop-blur-sm rounded-lg absolute top-2 left-2"
                  onClick={() => handleDeleteFlight(flights._id)}
                >
                  <Delete />
                </button>
              </div>
              <div>
                <p className="">Arrival City Name: {flights.arrivalCity}</p>
                <p className="">Product Description: {flights.description}</p>
                <p className="">Price: ₹{flights.price.toFixed(2)}</p>
              </div>
            </li>
          ))}
        </ul>
        <p className="font-semibold mt-4">Total Price: ₹{total}</p>
      </div>
    </div>
  );
}
