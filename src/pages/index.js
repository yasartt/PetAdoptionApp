//import './App.css';
import {Link } from "react-router-dom";

function Home() {
  return (
    <div className="Home">
        <div className='text-yellow-600'>sdabaksjd</div>
        <p>DENEME CUM</p>
        <Link to="/auth">Auth</Link>
    </div>
  );
}

export default Home;
