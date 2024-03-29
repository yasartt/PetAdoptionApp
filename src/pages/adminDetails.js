//import './App.css';
import {Link } from "react-router-dom";
import davsan from './../davsan.jpeg';
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

function AdminD() {

    const { id } = useParams();

    useEffect(() => {
        axios.get(`https://localhost:7073/api/PetAdopter/GetAdoptionApplicationById/${id}`).then(response => {
          console.log("Gelen application: " , response.data)
        })
    }, [id]);

    const handleApprove = () => {
        axios.get(`https://localhost:7073/api/PetAdopter/ApproveApplication/${id}`).then(response => {
          console.log(response.data)
        }).catch(error => {
          console.log(error)
        });
    }

    const handleDecline = () => {
        axios.get(`https://localhost:7073/api/PetAdopter/DeclineApplication/${id}`).then(response => {
          console.log(response.data)
        }).catch(error => {
            console.log(error)
          });
    }

  return (
    <div className="flex flex-col items-center space-y-3">
        <div className="flex flex-row">
            <div className="flex flex-col items-center justify-center bg-bunny-100 border-2 border-bunny-300 rounded-lg space-y-4 p-4 m-5">
                <img src={davsan} alt="Davsan" className="rounded-lg overflow-clip w-2/3 mt-5  border-2 border-bunny-300"/>
                <p className="bg-bunny-400 rounded-lg text-white p-2 text-center">Pet Information</p>
                <p className="h-32">Info... {id}</p>
            </div>

            <div className="flex flex-col items-center justify-center bg-bunny-100 border-2 border-bunny-300 rounded-lg space-y-4 p-4 m-5">
                <img src={davsan} alt="Davsan" className="rounded-lg overflow-clip w-2/3 mt-5  border-2 border-bunny-300"/>
                <p className="bg-bunny-400 rounded-lg text-white p-2 text-center">Adopter Information</p>
                <p className="h-32">Info...</p>
            </div>
            <div className="fixed z-50 flex flex-row justify-center bottom-10 inset-x-0 space-x-16 ml-24">
                <button 
                    className="bg-green-600 rounded-lg text-white p-3 "
                    onClick={() => handleApprove()}
                >Approve</button>
                <button 
                    className="bg-red-600 rounded-lg text-white p-3"
                    onClick={() => handleDecline()}    
                >Decline</button>
            </div>
        </div>
        
    </div>
  );
}

export default AdminD;
