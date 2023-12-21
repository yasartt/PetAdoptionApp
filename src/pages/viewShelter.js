//import './App.css';
import {Link } from "react-router-dom";

import davsan from './../davsan.jpeg';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";

function ViewShelter() {

  const { id } = useParams();

  const [shelter, setShelter] = useState()

  useEffect(() => {
    axios.get(`https://localhost:7073/api/Pet/GetShelterByPetId/${id}`).then(response => {
      setShelter(response.data)
    })
  }, [id]);


  return (
    
    <div className="flex flex-col items-center">

      {shelter && (
       <div className="flex flex-row m-5">
        <img src={davsan} alt="Davsan" className="w-1/3 rounded-lg "/>
        <div className="flex flex-col space-y-1 w-1/3 m-2 text-white justify-evenly">
                <p className="bg-bunny-400 rounded-lg p-1">Name: {shelter.name}</p>
                <p className="bg-bunny-400 rounded-lg p-1">Address: {shelter.address}</p>
                              
        </div>
        
        
       </div>
        )}

        <p>More information about Shelter</p>
        <p className="bg-bunny-100  m-5 rounded-lg w-11/12 p-4">cu</p>



    </div>
  );
}

export default ViewShelter;
