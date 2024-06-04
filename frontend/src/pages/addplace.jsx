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
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col w-full items-center justify-center mt-3">
          <div className=" flex flex-col min-w-max max-w-lg">
            <div className=" m-2 p-2 rounded-lg">
              <input
                className="rounded-lg px-2 py-1 text-dark"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className=" m-2 p-2 rounded-lg">
              <input
                className="rounded-lg px-2 py-1 text-dark"
                name="location"
                placeholder="Location"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>
            <div className=" m-2 p-2 rounded-lg">
              <textarea
                className="rounded-lg px-2 py-1 text-dark"
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>
            <div className=" m-2 p-2 rounded-lg">
              <input
                className="rounded-lg px-2 py-1 text-dark"
                name="price"
                type="number"
                placeholder="Price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        <div className=" flex flex-col w-full items-center justify-center mt-3">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="file_input"
          >
            Upload file
          </label>
          <input
            className="block  text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            type="file"
            accept="image/*"
            name="image"
            onChange={onImageChange}
          />
          <p
            className="mt-1 text-sm text-gray-500 dark:text-gray-300"
            id="file_input_help"
          >
            Upload Images Only
          </p>
        </div>

        <div className="flex  w-full items-center justify-center mt-3">
          <label className="mx-3 p-2">
            <input
              type="radio"
              name="category"
              value="beach"
              checked={formData.category === "beach"}
              onChange={handleCategoryChange}
            />
            Beach
          </label>
          <label className="mx-3 p-2">
            <input
              type="radio"
              name="category"
              value="mountains"
              checked={formData.category === "mountains"}
              onChange={handleCategoryChange}
            />
            Mountains
          </label>
          <label className="mx-3 p-2">
            <input
              type="radio"
              name="category"
              value="city"
              checked={formData.category === "city"}
              onChange={handleCategoryChange}
            />
            City
          </label>
          <label className="mx-3 p-2">
            <input
              type="radio"
              name="category"
              value="forest"
              checked={formData.category === "forest"}
              onChange={handleCategoryChange}
            />
            Forest
          </label>
        </div>
        <div className="flex flex-col w-full items-center justify-center mt-3">
          <progress
            className="progress rounded-full bg-black dark:bg-white"
            value={imgper}
            max={100}
          ></progress>
          <span>
            <p className="mx-2">{imgper}%</p>
          </span>
        </div>

        <div className=" flex flex-col w-full items-center justify-center mt-3">
          {imgper === 100 && (
            <button
              className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2"
              type="submit"
            >
              Add Place
            </button>
          )}

          {/* Hidden input for userId */}
          <input type="hidden" name="userId" value={formData.userId} />
        </div>
      </form>
    </>
  );
}
