//import './App.css';
import {Link } from "react-router-dom";
import davsan from './../davsan.jpeg';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from "react";



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
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const vets = [
    { id: 1, name: 'Salih' },
    { id: 2, name: 'Emre' },
    { id: 3, name: 'Abuzer' },
  ];

  const pets = [
    { id: 1, name: 'Lion' },
    { id: 2, name: 'Elephant' },
    { id: 3, name: 'Giraffe' },
  ];

  

    

  return (
    <div className="flex flex-col items-center space-y-3 p-3">

       <p>Name:</p>
       <p>Adoption Information</p>

       {pets.map(animal => (
              <div key={animal.id}>
                <div className="flex flex-row bg-bunny-100 border-2 border-bunny-400 rounded-xl m-4">
                <img src={davsan} alt="Davsan" className="w-1/4 rounded-l-lg overflow-clip"/>
                <div className="flex flex-col space-y-1 w-2/4 m-2 text-white justify-evenly">
                    <p className="bg-bunny-400 rounded-lg p-1">Name: {animal.name}</p>
                    <p className="bg-bunny-400 rounded-lg p-1">Type:</p>
                    <div className="flex flex-row space-x-2 justify-around">
                        <p className="bg-bunny-400 rounded-lg p-1">Age:</p>
                        <p className="bg-bunny-400 rounded-lg p-1">Sex:</p>
                    </div>                

                </div>
                <div className="flex flex-col w-1/4 space-y-1 justify-evenly p-1">
                    <p className="bg-bunny-400 rounded-lg p-1 text-white">Status:</p>
                    <p className="bg-bunny-500 rounded-lg p-1 text-white">Schedule</p>
                    <button onClick={handleOpen} className="bg-bunny-500 rounded-lg p-1 text-white">Vet App.</button>
                </div>
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
                    <p>Vet Name: {animal.name} </p>
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
        <p>Upload Resume</p>
        
        <p>{localStorage.getItem('userId')}</p>


    </div>
  );
}

export default Profile;
