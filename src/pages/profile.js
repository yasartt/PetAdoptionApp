//import './App.css';
import {Link } from "react-router-dom";
import davsan from './../davsan.jpeg';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState, useEffect } from "react";
import axios from 'axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
function Profile() {
  const [open, setOpen] = useState(false);
  const [animals, setAnimals] = useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const vets = [
    { id: 1, name: 'Lion' },
    { id: 2, name: 'Elephant' },
    { id: 3, name: 'Giraffe'  },
  ];

  /**const animals = [
    {
    name: "pamuk",
    gender:"male",
    age: 8,
    breed: "sulalesini" , 
    status:"iyi",
    photo_id: "../public/assets/rabbit.png", 
    vets: [
      { id: 1, name: 'Lion' },
      { id: 2, name: 'Elephant' },
      { id: 3, name: 'Giraffe' },
    ] },
    {name: "pamuk",
    gender:"male",
    age: 87,
    breed: "sulalesini" , 
    status:"iyi",
    photo_id: "../public/assets/rabbit.png", 
    vets: [
      { id: 1, name: 'Liasdon' },
      { id: 2, name: 'Elepasdhant' },
      { id: 3, name: 'Girasaffe' },
    ] },
    {name: "paasdmuk",
    gender:"maasdle",
    age: 89,
    breed: "sualalesini" , 
    status:"iyai",
    photo_id: "../public/assets/rabbit.png", 
    vets: [
      { id: 1, name: 'Lionasd' },
      { id: 2, name: 'Elepasdhant' },
      { id: 3, name: 'Giraasdffe' },
    ] }
  ];*/
  ///const [currentName] = useState(localStorage.getItem(username));

  useEffect(() => {
    axios.get(`https://localhost:7073/api/PetAdopter/GetAllAdopters`).then(response => {
      console.log(response);
    }).catch(error => {
      console.log(error);
    });
  

   axios.get(`https://localhost:7073/api/PetAdopter/GetPetsOfAdopter/${localStorage.getItem("userId")}`
        ).then(response => {
            console.log(response);
            setAnimals(response.data);
        }).catch(error => {
          console.log(error);
        });
  }, [localStorage.getItem("userId")])

  return (

    <div className="flex flex-col items-center space-y-3 p-3">

       <p>Name: {localStorage.getItem("name")}</p>
       <p>Adoption Information</p>
       {animals.map((animal, index) => (
       <div className="flex flex-row bg-bunny-100 border-2 border-bunny-400 rounded-xl m-4">
            <img src={davsan} alt="Davsan" className="w-1/4 rounded-l-lg overflow-clip"/>
            <div className="flex flex-col space-y-1 w-2/4 m-2 text-white justify-evenly">
                <p className="bg-bunny-400 rounded-lg p-1">Name: {animal.name}</p>
                <p className="bg-bunny-400 rounded-lg p-1">Type: {animal.breed}</p>
                <div className="flex flex-row space-x-2 justify-around">
                    <p className="bg-bunny-400 rounded-lg p-1">Age: {animal.age}</p>
                    <p className="bg-bunny-400 rounded-lg p-1">Sex: {animal.gender}</p>
                </div>                

            </div>
            <div className="flex flex-col w-1/4 space-y-1 justify-evenly p-1">
                <p className="bg-bunny-400 rounded-lg p-1 text-white">Status: {animal.status}</p>
                <p className="bg-bunny-500 rounded-lg p-1 text-white">Schedule</p>
                <button onClick={handleOpen} className="bg-bunny-500 rounded-lg p-1 text-white">Vet App.</button>
            </div>
        </div>
        ))}
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2" className="flex justify-center">
              List of Vets
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }} className="flex flex-col items-center space-y-4">
            {vets.map(animal => (
              <div key={animal.id}>
                <Link to={`/detailsVet/${animal.id}`} className="flex flex-row bg-bunny-100 rounded-lg border-2 border-bunny-300 justify-between">
                <div className="flex flex-col p-2 w-3/4text-left">
                    <p>Vet Name: </p>
                    <p>Location: </p>
                </div>
                <div className="flex bg-bunny-400 rounded-r-sm w-1/4 items-center justify-center text-white">CU</div>
            </Link> 
              </div>
            ))}
            
            </Typography>
          </Box>
        </Modal>

        <p className="">Your resume:</p>
        <p>Question</p>
        <input className="border-2 border-bunny-300 rounded-lg p-1 bg-bunny-100 w-11/12" type="text" placeholder="Answer"/>


    </div>
  );
}

export default Profile;
