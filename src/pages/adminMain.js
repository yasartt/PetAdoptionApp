//import './App.css';
import {Link } from "react-router-dom";
import davsan from './../davsan.jpeg';
import { useEffect, useState } from "react";
import axios from 'axios';

function AdminM() {

  const [applications, setApplications] = useState([]);

  useEffect(() => {
    axios.get('https://localhost:7073/api/PetAdopter/GetNewWaitingApplications').then(response => {
      setApplications(response.data)
    })
  }, []);

  return (
    <div className="flex flex-col items-center space-y-3">
        <p className="mt-5">Welcome: </p>
        <p>Waiting Applications:</p>
        <ul>
        {applications.map(application => (
          <li key={application.id}>
            <Link to={`/adminDetails/${application.adoptionApplicationId}`} className="flex flex-row bg-bunny-100 rounded-lg border-2 border-bunny-300  justify-between m-3">
            <div className="flex flex-col p-2 w-3/4 text-left">
                <p>Adopter Name: {application.petAdopter.name}</p>
                <p>Pet Name: {application.pet.name}</p>
                <p>Shelter Name: {application.shelter.name}</p>
            </div>
            <div className="flex bg-bunny-400 rounded-r-sm w-1/4 items-center justify-center text-white">CU</div>
            </Link>
          </li>
        ))}
        </ul>
        
    </div>
  );
}

export default AdminM;
