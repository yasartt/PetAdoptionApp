//import './App.css';
import {Link } from "react-router-dom";
import davsan from './../davsan.jpeg';
import { storage } from './../firebase'; // Import the storage instance
import { ref, uploadBytes, getStorage, getDownloadURL } from "firebase/storage";
import { useState, useEffect } from "react";
import axios from "axios";


  function makeid() {
    let length = 5
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

function AddPet() {

    const [urll,setUrl] = useState('')
    const [id,setId] = useState(makeid())

  useEffect(() => {
    const storage = getStorage();
    const storageRef = ref(storage, `pets/${id}`);

    getDownloadURL(storageRef)
      .then(url => {
        setUrl(url)
      })
      .catch(error => {
        if (error.code === 'storage/object-not-found') {
          setUrl("cu")
        } else {
          setUrl("cu")
        }
      });
      
  }, []);

  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (file) {
      const storage = getStorage();
      const storageRef = ref(storage, `pets/${id}`);

      // 'file' comes from the Blob or File API
      uploadBytes(storageRef, file).then((snapshot) => {
        alert('Upload Successfull');
      });
    } else {
      alert('No file selected');
    }

  
    
  };

  const [breed, setBreed] = useState("dog"); // Default breed value
  const [age, setAge] = useState("");
  const [name, setName] = useState("");
  const [sex, setSex] = useState("cu"); // Default sex value

  const handleBreedChange = (e) => {
    setBreed(e.target.value);
  };

  const handleAgeChange = (e) => {
    setAge(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSexChange = (e) => {
    setSex(e.target.value);
  };

  const handleAddAnimal = () => {
    // Make sure all required fields are filled
    if (!breed || !age || !name || !sex) {
      alert("Please fill in all required fields");
      return;
    }
    handleUpload()

    const postData = {
      breed,
      age: parseInt(age), // Convert age to an integer (assuming age is a number)
      name,
      status: "0",
      gender: sex,
      isAvailable: 1,
      photo_id: id,
    };

    // Make the Axios POST request
    axios.post("https://localhost:7073/api/Pet/AddPet", postData)
      .then(response => {
        // Handle successful response (e.g., show a success message)
        alert('Animal added successfully');
      })
      .catch(error => {
        // Handle error (e.g., show an error message)
        console.error('Error adding animal:', error);
      });
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-row m-5 space-x-4">
        <div className="flex flex-col w-1/2 space-y-2 bg-bunny-100 rounded-lg p-2 items-center">
          <div className="flex flex-col items-center">
            <input type="file" onChange={handleFileChange} />
            <p className="text-7xl mt-12">+</p>
          </div>
        </div>

        <div className="flex flex-col w-1/2 space-y-2 items-center">
          <form className="flex flex-col items-center">
            <label className="self-start text-sm" htmlFor="name">
              Username:
            </label>
            <input
              id="name"
              className="rounded-lg bg-bunny-100 p-1"
              type="text"
              value={name}
              onChange={handleNameChange}
            />
          </form>
          <form className="flex flex-col items-center">
            <label className="self-start text-sm" htmlFor="age">
              Age:
            </label>
            <input
              id="age"
              className="rounded-lg bg-bunny-100 p-1"
              type="text"
              value={age}
              onChange={handleAgeChange}
            />
          </form>

          <div className="flex flex-col items-start">
            <label htmlFor="animals" className="text-sm">
              Select Type:
            </label>
            <select
              id="animals"
              className="bg-bunny-100 p-1 rounded-lg"
              value={breed}
              onChange={handleBreedChange}
            >
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
              <option value="rat">Rat</option>
              <option value="shark">Shark</option>
            </select>
          </div>

          <div className="flex flex-col items-center">
            <label htmlFor="sex" className="text-sm">
              Select Sex:
            </label>
            <select
              id="sex"
              className="bg-bunny-100 p-1 rounded-lg"
              value={sex}
              onChange={handleSexChange}
            >
              <option value="LGBTQ Pro Max Plus">LGBTQ Pro Max Plus</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        </div>
      </div>
      <p className="bg-bunny-100 rounded-lg w-11/12 p-3 h-32">Information about pet</p>

      <div className="fixed z-50 flex flex-row justify-center bottom-10 inset-x-0 space-x-16 ml-24">
        <button
          className="bg-green-600 rounded-lg text-white p-3 "
          onClick={handleAddAnimal}
        >
          Add Animal
        </button>
        <Link to="/listShelter" className="bg-red-600 rounded-lg text-white p-3  ">
          Cancel
        </Link>
      </div>
    </div>
  );
}

export default AddPet;