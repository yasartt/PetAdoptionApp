import { Outlet, Link, useLocation} from "react-router-dom";
import { useState, useEffect } from 'react';
import logo from './../rabbit.png';

function Layout() {

    const [title, setTitle] = useState("");
    const currentLocation = useLocation();
    const [isAuth,setAuth] = useState(false);

    const userType = localStorage.getItem('userType');

    const[isAdapterVisable] = useState(userType === "Adopter");
    const[isShelterVisable] = useState(userType === "Shelter");
    const[isVeterinarianVisable] = useState(userType === "Veterinarian");
    const[isAdminVisable] = useState(userType === "Admin");
    console.log(localStorage.getItem("userType"))

    
    useEffect(() => {
        if(currentLocation.pathname === "/auth") {
            setTitle("Auth")
        }
        if(currentLocation.pathname === "/") {
            setTitle("Home")
        }
        if(currentLocation.pathname === "/list") {
            setTitle("List")
        }
        if(currentLocation.pathname === "/details") {
            setTitle("Details")
        }
        if(currentLocation.pathname === "/profile") {
            setTitle("Profile")
        }
        if(currentLocation.pathname === "/adminMain") {
            setTitle("Admin")
        }
        if(currentLocation.pathname === "/adminDetails") {
            setTitle("AdminDetails")
        }
        if(currentLocation.pathname === "/listShelter") {
            setTitle("List Shelter")
        }
        if(currentLocation.pathname === "/profileVet") {
            setTitle("Vet Profile")
        }
        if(currentLocation.pathname === "/auth") {
            setAuth(true)
        }
        else {
            setAuth(false)
        }
      }, [currentLocation])

  return (
    <>
      <nav className="bg-bunny-300 flex justify-between h-10">

        {!isAuth && (<img src={logo} alt="Davsan" className="overflow-visible ml-1 z-50 h-20 p-2"/>)}
        {isAuth && (<p className="text-bunny-300">CU</p>)}
        <p className="bg-bunny-200 text-bunny-400 m-1 p-1 px-2 rounded-lg">{title}</p>
        <Link to="/">Home</Link>
        
      </nav>
      <div className="flex flex-row">
        {!isAuth && (
        <div className="h-screen bg-bunny-200 w-1/6 flex flex-col space-y-3">

            <div className="p-3 bg-bunny-400 text-white mt-12 mx-2 rounded-xl flex justify-center">
                <Link to="/">Home</Link>
            </div>

            <div className="p-3 bg-bunny-400 text-green-100 mx-2 rounded-xl flex justify-center">
                <Link to="/auth">Auth</Link>
            </div>
            {isAdapterVisable && ( 
            <>            
                {title === "List" && (<div className="p-3 bg-bunny-300 text-green-100 mx-2 rounded-xl flex justify-center">
                    <Link to="/list">List</Link>
                </div>)}

                {title !== "List" &&(<div className="p-3 bg-bunny-400 text-green-100 mx-2 rounded-xl flex justify-center">
                    <Link to="/list">List</Link>
                </div>)}

                {title === "Profile" && (<div className="p-3 bg-bunny-300 text-green-100 mx-2 rounded-xl flex justify-center">
                    <Link to="/profile">Profile</Link>
                </div>)}
                {title !== "Profile" && (<div className="p-3 bg-bunny-400 text-green-100 mx-2 rounded-xl flex justify-center">
                    <Link to="/profile">Profile</Link>
                </div>)}     
            </>
            )}

            {isAdminVisable && (
            <>
                <div className="p-3 bg-bunny-400 text-green-100 mx-2 rounded-xl flex justify-center">
                    <Link to="/adminMain">AdminM</Link>
                </div>              
            </>
            )}

            {isShelterVisable &&(
                <div className="p-3 bg-bunny-400 text-green-100 mx-2 rounded-xl flex justify-center">
                    <Link to="/listShelter">List Shelter</Link>
                </div>
            )}

            {isShelterVisable && (
            <>{/*Bunları koydum çünkü buton tıklamaya*/}
            <div className="p-3 bg-bunny-400 text-green-100 mx-2 rounded-xl flex justify-center">
                <Link to="/profileShelter">Profile Shelter</Link>
            </div>
            </>
            )}
            {isVeterinarianVisable && (
            <div className="p-3 bg-bunny-400 text-green-100 mx-2 rounded-xl flex justify-center">
                <Link to="/profileVet">Vet Profile</Link>
            </div>
            )}
       



        </div>
        )}

        {!isAuth && (
        <div className="w-5/6">
            <Outlet/>
        </div>
        )}
        {isAuth && (
        <div className="w-screen">
            <Outlet/>
        </div>
        )}

      </div>
      
      
      
    </>
  );
}

export default Layout;
