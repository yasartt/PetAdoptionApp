//import './App.css';
import {Link } from "react-router-dom";
import davsan from './../davsan.jpeg';


function AdminM() {

  const applications = [
    { id: 1, name: 'Lion' },
    { id: 2, name: 'Elephant' },
    { id: 3, name: 'Giraffe' },
  ];
  return (
    <div className="flex flex-col items-center space-y-3">
        <p className="mt-5">Welcome: </p>
        <p>Waiting Applications:</p>
        <ul>
        {applications.map(animal => (
          <li key={animal.id}>
            <Link to={`/adminDetails/${animal.id}`} className="flex flex-row bg-bunny-100 rounded-lg border-2 border-bunny-300  justify-between m-3">
            <div className="flex flex-col p-2 w-3/4 text-left">
                <p>Adopter Name: </p>
                <p>Pet Name: {animal.name}</p>
                <p>Shelter Name: </p>
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
