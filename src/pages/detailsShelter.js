//import './App.css';
import {Link } from "react-router-dom";
import davsan from './../davsan.jpeg';
import { useParams } from "react-router-dom";

function DetailsS() {

  const { id } = useParams();

  return (
    <div className="flex flex-col items-center">

       <div className="flex flex-row m-5 space-x-4">

            <img src={davsan} alt="Davsan" className="w-1/2 rounded-lg "/>

            <div className="flex flex-col w-1/2 space-y-2">
                <p className="bg-bunny-200 rounded-lg p-1">Name: {id}</p>
                <p className="bg-bunny-200 rounded-lg p-1">Type:</p>
                <p className="bg-bunny-200 rounded-lg p-1">Age:</p>
                <p className="bg-bunny-200 rounded-lg p-1">Sex:</p>   
            </div>


       </div>

        <p className="bg-bunny-100  m-5 rounded-lg w-11/12 p-4 h-32">More information about Pet</p>
        <div className="bg-red-600 rounded-lg text-white p-3 ">Delete Pet</div>

    </div>
  );
}

export default DetailsS;
