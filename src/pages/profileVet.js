//import './App.css';
import {Link } from "react-router-dom";
import davsan from './../davsan.jpeg';
import React, { useState } from 'react';



function ProfileVet() {

const [pets, setPets] = useState([
  { id: 1, name: 'Lion', healthRecord: '' },
  { id: 2, name: 'Elephant', healthRecord: '' },
  { id: 3, name: 'Giraffe', healthRecord: '' },
]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [healthRecordInput, setHealthRecordInput] = useState('');


  const handleAnimalClick = (animal) => {
    setSelectedPet(animal);
    setHealthRecordInput(animal.healthRecord);
  };

  const handleHealthRecordChange = (event) => {
    setHealthRecordInput(event.target.value);
  };

  const saveHealthRecord = () => {
    setPets(pets.map(pet => {
      if (pet.id === selectedPet.id) {
        return { ...pet, healthRecord: healthRecordInput };
      }
      return pet;
    }));
    setSelectedPet(null); // Optionally close the input box after saving
  };

  return (
    <div className="flex flex-col items-center space-y-3 p-3">

       <p>Name:</p>
       <p>Appointments</p>

       {pets.map(animal => (
              <div key={animal.id}>
                <div className="flex flex-row bg-bunny-100 border-2 border-bunny-400 rounded-xl m-4">
                <img src={davsan} alt="Davsan" className="w-1/4 rounded-l-lg overflow-clip"/>
                <div className="flex flex-col space-y-1 w-2/4 m-2 text-white justify-evenly">
                    <p className="bg-bunny-400 rounded-lg p-1">Name:</p>
                    <p className="bg-bunny-400 rounded-lg p-1">Type:</p>
                    <div className="flex flex-row space-x-2 justify-around">
                        <p className="bg-bunny-400 rounded-lg p-1">Age:</p>
                        <p className="bg-bunny-400 rounded-lg p-1">Sex:</p>
                        <p className="bg-bunny-400 rounded-lg p-1">Health Record: {animal.healthRecord}</p>
                        <button onClick={() => handleAnimalClick(animal)} className="bg-bunny-500 rounded-lg p-1 text-white">
                        Update Health Record
                        </button>

                    </div>                

                </div>
                {selectedPet && (
                  <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
                    <div className="bg-white p-5 rounded-lg shadow-xl">
                      <h2 className="text-lg font-bold mb-4">Update Health Record for {selectedPet.name}</h2>
                      <input 
                        type="text" 
                        value={healthRecordInput} 
                        onChange={handleHealthRecordChange} 
                        className="p-2 border border-gray-300 rounded"
                      />
                      <button 
                        onClick={saveHealthRecord} 
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                )}
                <div className="flex flex-col w-1/4 space-y-1 justify-evenly p-1">
                    <p className="bg-bunny-400 rounded-lg p-1 text-white">Status:</p>
                    <p className="bg-bunny-500 rounded-lg p-1 text-white">Schedule</p>
                </div>
            </div>
              </div>
            ))}

       

       

    </div>
  );
}

export default ProfileVet;
