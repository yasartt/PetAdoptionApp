//import './App.css';
import {Link } from "react-router-dom";
import davsan from './../davsan.jpeg';
import { useParams } from "react-router-dom";

function DetailsV() {
  const { id } = useParams();

  return (
    <div className="flex flex-col items-center">

       <div className="flex flex-row m-5 space-x-4">

            <img src={davsan} alt="Davsan" className="w-1/2 rounded-lg "/>

            <div className="flex flex-col w-1/2 space-y-2">
                <p className="bg-bunny-200 rounded-lg p-1">Name: {id}</p>
                <p className="bg-bunny-200 rounded-lg p-1">Speciality:</p>
                <p className="bg-bunny-200 rounded-lg p-1">Age:</p>
                <p className="bg-bunny-200 rounded-lg p-1">Genda:</p>   
            </div>


       </div>

        <p className="bg-bunny-100  m-5 rounded-lg w-11/12 p-4 h-32">More information about Vet</p>
        <div className="bg-bunny-400 rounded-lg text-white p-3 ">Schedule an Appointment</div>

    </div>
  );
}

export default DetailsV;
