import {Link } from "react-router-dom";
import davsan from './../davsan.jpeg';
import { useState, useEffect } from "react";
import axios from 'axios';



function List() {

    const [animals,setAnimals] = useState([])
    const pets = [
        { id: 1, name: 'Lion' },
        { id: 2, name: 'Elephant' },
        { id: 3, name: 'Giraffe' },
      ];
    


    useEffect(() => {
        axios.get('https://localhost:7073/api/Pet/GetAllPets').then(response => {
        setAnimals(response.data)
    })
      }, []);



  return (
    <div className="List">

        <div className="flex justify-around mt-5 items-center space-x-5">
            <input className="border-2 border-bunny-400 rounded-lg p-1 bg-bunny-100" type="text" placeholder="Search..."/>
            <p>Filters</p>
        </div>

        <ul>
        {animals.map(animal => (
          <li key={animal.petId}>
            <Link to={`/details/${animal.petId}`} className="flex flex-row bg-bunny-100 border-2 border-bunny-400 rounded-xl m-4">
            <img src={davsan} alt="Davsan" className="w-1/4 rounded-l-lg overflow-clip"/>
            <div className="flex flex-col space-y-1 w-2/4 m-2 text-white justify-evenly">
                <p className="bg-bunny-400 rounded-lg p-1">Name: {animal.name}</p>
                <p className="bg-bunny-400 rounded-lg p-1">Breed: {animal.breed}</p>
                <div className="flex flex-row space-x-2 justify-around">
                    <p className="bg-bunny-400 rounded-lg p-1">Age: {animal.age}</p>
                    <p className="bg-bunny-400 rounded-lg p-1">Gender: {animal.gender}</p>
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
