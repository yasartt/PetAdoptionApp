//import './App.css';
import {Link } from "react-router-dom";

import davsan from './../davsan.jpeg';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';


function Details() {

  const { id } = useParams();
  const [animal,setAnimal] = useState()
  const [shelter, setShelter] = useState()
  const [record, setRecord] = useState()
  const navigate = useNavigate();
  const records = [
    { id: 1, name: 'AIDS' },
    { id: 2, name: 'Bel Soguklugu' },
    { id: 3, name: 'Miyala' },
  ];

  useEffect(() => {
    axios.get(`https://localhost:7073/api/Pet/GetPetById/${id}`).then(response => {
      setAnimal(response.data)
    })
    axios.get(`https://localhost:7073/api/Pet/GetShelterByPetId/${id}`).then(response => {
      setShelter(response.data)
    })
    axios.get(`https://localhost:7073/api/Pet/GetHealthRecordOfPet/${id}`).then(response => {
      setRecord(response.data)
    })
  }, [id]);

  const handleApplication = () => {
    const params = {
      petId: id,
      petAdopterId: localStorage.getItem('userId'),
    };

    params.petId = parseInt(params.petId);
    params.petAdopterId = parseInt(params.petAdopterId);

    axios.post(`https://localhost:7073/api/PetAdopter/ApplyForPet`, params).then(response => {
      console.log(response.data)
      if(response.data === true){
        navigate('/profile')
      }
    }).catch(error => {
      console.log(error)
    });
  }


  return (
    <div className="flex flex-col items-center">

{animal && (<div className="flex flex-row m-5">
        <img src={davsan} alt="Davsan" className="w-1/3 rounded-lg "/>
        <div className="flex flex-col space-y-1 w-1/3 m-2 text-white justify-evenly">
                <p className="bg-bunny-400 rounded-lg p-1">Name: {animal.name}</p>
                <p className="bg-bunny-400 rounded-lg p-1">Breed: {animal.breed}</p>
                <p className="bg-bunny-400 rounded-lg p-1">Age: {animal.age}</p>
                <p className="bg-bunny-400 rounded-lg p-1">Gender: {animal.gender}</p>                
        </div>
        {shelter && (
        <div className="flex flex-col">
          <p className="bg-bunny-400 rounded-lg m-2 text-white p-1">Shelter: {shelter.name}</p>
          <Link to={`/viewShelter/${shelter.userId}`} className="bg-bunny-500 rounded-lg m-2 text-white p-1 text-center">View Shelter</Link>
        </div>)}
        
       </div>)}

        <p>More information about Pet</p>
        <p className="bg-bunny-100  m-5 rounded-lg w-11/12 p-4">cu</p>

        <div className="mx-5">
          <Accordion>
            <AccordionSummary
              expandIcon={'v'}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography >Health Records</Typography>
            </AccordionSummary>
            <AccordionDetails>
            <ul>
            {records.map(animal => (
              <li key={animal.id}>
                <p>{animal.name}</p>
              </li>
            ))}
            </ul>
            </AccordionDetails>
          </Accordion>
        </div>
        
        

        <button 
          className="bg-bunny-500 rounded-lg text-white p-3 fixed bottom-10"
          onClick={() => handleApplication()}
          >Apply</button>

    </div>
  );
}

export default Details;
