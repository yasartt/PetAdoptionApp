import {Link } from "react-router-dom";
import davsan from './../davsan.jpeg';
import { useState, useEffect } from "react";
import axios from 'axios';



function List() {
  
  const [animals, setAnimals] = useState([]);
  const [minAge, setMinAge] = useState('');
  const [maxAge, setMaxAge] = useState('');
  const [sex, setSex] = useState('');
  const[breed,setBreed] = useState("");

  const handleFilterSubmit = () => {
    // Construct the query parameters based on the filter inputs
    const params = new URLSearchParams({
        minAge: minAge,
        maxAge: maxAge,
        sex: sex,
        breed : breed
    }).toString();

    axios.get(`https://localhost:7073/api/Pet/FilterPets?${params}`).then(response => {
        setAnimals(response.data);
    });
};

    


    useEffect(() => {
        axios.get('https://localhost:7073/api/Pet/GetAllPets').then(response => {
        setAnimals(response.data)
    })
      }, []);

  



  return (
    <div className="List">

        <div className="flex justify-around mt-5 items-center space-x-5">
            <input className="border-2 border-bunny-400 rounded-lg p-1 bg-bunny-100" type="text" placeholder="Search..."/>
            <div className="flex justify-around mt-5 items-center space-x-5">
                {/* Filter Inputs */}
                <label>Breed </label>
                <input
                    className="border-2 border-bunny-400 rounded-lg p-1 bg-bunny-100"
                    type="text"
                    placeholder="Breed"
                    value={breed}
                    onChange={e => setBreed(e.target.value)}
                />
                <label>Min Age: </label>
                <input
                    className="border-2 border-bunny-400 rounded-lg p-1 bg-bunny-100"
                    type="number"
                    placeholder="Min Age"
                    value={minAge}
                    onChange={e => setMinAge(e.target.value)}
                />
                <label>Max Age: </label>
                <input
                    className="border-2 border-bunny-400 rounded-lg p-1 bg-bunny-100"
                    type="number"
                    placeholder="Max Age"
                    value={maxAge}
                    onChange={e => setMaxAge(e.target.value)}
                />
                <label>Sex: </label>
                <select
                    className="border-2 border-bunny-400 rounded-lg p-1 bg-bunny-100"
                    value={sex}
                    onChange={e => setSex(e.target.value)}
                >
                    <option value="">Any Sex</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
                <button
                    className="bg-bunny-400 p-2 rounded-lg text-white"
                    onClick={handleFilterSubmit}
                >
                    Apply Filters
                </button>
            </div>
        </div>

        <ul>
        {animals.map(animal => (
          <li key={animal.petId}>
            <Link to={`/details/${animal.id}`} className="flex flex-row bg-bunny-100 border-2 border-bunny-400 rounded-xl m-4">
            <img src={davsan} alt="Davsan" className="w-1/4 rounded-l-lg overflow-clip"/>
            <div className="flex flex-col space-y-1 w-2/4 m-2 text-white justify-evenly">
                <p className="bg-bunny-400 rounded-lg p-1">Name: {animal.name}</p>
                <p className="bg-bunny-400 rounded-lg p-1">Type {animal.petId}:</p>
                <div className="flex flex-row space-x-2 justify-around">
                    <p className="bg-bunny-400 rounded-lg p-1">Age: {animal.age}</p>
                    <p className="bg-bunny-400 rounded-lg p-1">Sex: {animal.gender}</p>
                </div>                

            </div>
            <p className="bg-bunny-400 rounded-lg w-1/4 m-2 text-white p-1">Address:</p>
            </Link>
          </li>
        ))}
        </ul>
        
    </div>
  );
}

export default List;
