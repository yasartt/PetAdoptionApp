//import './App.css';
import {Link } from "react-router-dom";
import davsan from './../davsan.jpeg';


function ProfileS() {

  const pets = [
    { id: 1, name: 'Lion' },
    { id: 2, name: 'Elephant' },
    { id: 3, name: 'Giraffe' },
  ];
  return (
    <div className="flex flex-col items-center space-y-3 p-3">

       <p>Welcome:</p>
       <p>Appointments</p>

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
                </div>
            </div>
              </div>
            ))}

       

        <div className="fixed z-50 flex flex-row justify-center bottom-10 inset-x-0 space-x-16 ml-24">
                <div className="bg-bunny-500 rounded-lg text-white p-3">Arrange Schedule</div>
        </div>

    </div>
  );
}

export default ProfileS;
