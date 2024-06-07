import axios from "axios";
import { useEffect, useState } from "react";

export default function AdvertisementForm() {
  const [formData, setFormData] = useState({
    flightNumber: "",
    departureCity: "",
    arrivalCity: "",
    departureDate: "",
    arrivalDate: "",
    additionalInfo: "",
    price: "",
  });

  useEffect(() => {
    const userdata = JSON.parse(localStorage.getItem("user"));
    if (userdata && userdata.user && userdata.user._id) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        userId: userdata.user._id,
      }));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const capitalizeFirstLetter = (string) => {
    return string.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedFormData = {
      ...formData,
      departureCity: capitalizeFirstLetter(formData.departureCity),
      arrivalCity: capitalizeFirstLetter(formData.arrivalCity),
    };
    try {
      const response = await axios.post("/addflight", updatedFormData);
      console.log(response.data);
      alert("Flight Added");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-light dark:bg-dark text-dark dark:text-light shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-4">Add a new Flight Service</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium" htmlFor="flightNumber">
            Flight Number
          </label>
          <input
            className="mt-1 text-dark p-2 w-full border rounded-md"
            type="text"
            id="flightNumber"
            name="flightNumber"
            value={formData.flightNumber}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium" htmlFor="departureCity">
            Departure City
          </label>
          <input
            className="mt-1 text-dark p-2 w-full border rounded-md"
            type="text"
            id="departureCity"
            name="departureCity"
            value={formData.departureCity}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium" htmlFor="arrivalCity">
            Arrival City
          </label>
          <input
            className="mt-1 text-dark p-2 w-full border rounded-md"
            type="text"
            id="arrivalCity"
            name="arrivalCity"
            value={formData.arrivalCity}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium" htmlFor="departureDate">
            Departure Date
          </label>
          <input
            className="mt-1 text-dark p-2 w-full border rounded-md"
            type="date"
            id="departureDate"
            name="departureDate"
            value={formData.departureDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium" htmlFor="arrivalDate">
            Arrival Date
          </label>
          <input
            className="mt-1 text-dark p-2 w-full border rounded-md"
            type="date"
            id="arrivalDate"
            name="arrivalDate"
            value={formData.arrivalDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium" htmlFor="price">
            Price
          </label>
          <input
            className="mt-1 text-dark p-2 w-full border rounded-md"
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium" htmlFor="additionalInfo">
            Additional Information
          </label>
          <textarea
            className="mt-1 text-dark p-2 w-full border rounded-md"
            id="additionalInfo"
            name="additionalInfo"
            value={formData.additionalInfo}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <button
            className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition duration-200"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
