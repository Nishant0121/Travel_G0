import axios from "axios";
import { useState, useEffect } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";

export default function AddPlaceForm() {
  const [image, setImage] = useState(undefined);
  const [imgper, setImgPer] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    description: "",
    price: "",
    category: "",
    userId: "", // Initially empty
    imgurl: "", // Store the image URL
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

  useEffect(() => {
    if (image) {
      uploadfile(image, "imgurl");
    }
  }, [image]);

  const uploadfile = async (file, type) => {
    const storage = getStorage(app);
    const folder = "placeimages/";
    const filename = new Date().getTime() + file.name;
    const storageRef = ref(storage, folder + filename);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImgPer(Math.round(progress));
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            break;
          default:
            break;
        }
      },
      (error) => {
        switch (error.code) {
          case "storage/unauthorized":
            break;
          case "storage/canceled":
            break;
          case "storage/unknown":
            break;
          default:
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setFormData((prevFormData) => ({
            ...prevFormData,
            [type]: downloadURL,
          }));
        });
      }
    );
  };

  const onImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e) => {
    setFormData({ ...formData, category: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post("/addplaces", formData);
    console.log(response.data);
    alert("Place added successfully");
    window.location.reload();
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 max-w-2xl mx-auto p-6 bg-light dark:bg-dark text-dark dark:text-light shadow-md rounded-lg mt-10"
      >
        <h2 className="text-2xl font-bold mb-4">Add a New Place</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium " htmlFor="name">
              Name
            </label>
            <input
              className="mt-1 text-dark block w-full p-2 border rounded-md shadow-sm"
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium " htmlFor="location">
              Location
            </label>
            <input
              className="mt-1 text-dark block w-full p-2 border rounded-md shadow-sm"
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium " htmlFor="description">
              Description
            </label>
            <textarea
              className="mt-1 text-dark block w-full p-2 border rounded-md shadow-sm"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium " htmlFor="price">
              Price
            </label>
            <input
              className="mt-1 text-dark block w-full p-2 border rounded-md shadow-sm"
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium " htmlFor="file_input">
              Upload Image
            </label>
            <input
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
              type="file"
              accept="image/*"
              id="file_input"
              onChange={onImageChange}
            />
            <p className="mt-1 text-sm text-gray-500">Upload Images Only</p>
          </div>

          <div className="flex flex-wrap gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="category"
                value="beach"
                checked={formData.category === "beach"}
                onChange={handleCategoryChange}
              />
              <span className="ml-2">Beach</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="category"
                value="mountains"
                checked={formData.category === "mountains"}
                onChange={handleCategoryChange}
              />
              <span className="ml-2">Mountains</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="category"
                value="city"
                checked={formData.category === "city"}
                onChange={handleCategoryChange}
              />
              <span className="ml-2">City</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="category"
                value="forest"
                checked={formData.category === "forest"}
                onChange={handleCategoryChange}
              />
              <span className="ml-2">Forest</span>
            </label>
          </div>

          <div className="w-full">
            <progress
              className="w-full h-2 rounded-full bg-gray-200"
              value={imgper}
              max={100}
            ></progress>
            <p className="text-center mt-1">{imgper}%</p>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          {imgper === 100 && (
            <button
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200"
              type="submit"
            >
              Add Place
            </button>
          )}
        </div>

        {/* Hidden input for userId */}
        <input type="hidden" name="userId" value={formData.userId} />
      </form>
    </>
  );
}
