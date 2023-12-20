
import { BrowserRouter as Router, Routes, Route, useLocation }
    from 'react-router-dom';
import Home from './pages';
import Auth from './pages/auth';
import Layout from './pages/layout';
import List from './pages/list';
import Details from './pages/details';
import Profile from './pages/profile';
import AdminM from './pages/adminMain';
import AdminD from './pages/adminDetails';
import ListS from './pages/listShelter';
import ProfileS from './pages/profileShelter';
import DetailsS from './pages/detailsShelter';
import './index.css';
import AddPet from './pages/addPet';
import ProfileVet from './pages/profileVet';
import DetailsV from './pages/detailsVet';
import ViewShelter from './pages/viewShelter';

function App() {
  return (
    <div className="App">

        <Router>
            <Routes>
                <Route path='/' element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route path='/auth' element={<Auth />} />
                  <Route path='/list' element={<List />} />
                  <Route path='/profile' element={<Profile />} />
                  <Route path='/adminMain' element={<AdminM />} />
                  <Route path='/adminDetails/:id' element={<AdminD />} />
                  <Route path='/listShelter' element={<ListS />} />
                  <Route path='/profileShelter' element={<ProfileS />} />
                  <Route path='/detailsShelter/:id' element={<DetailsS />} />
                  <Route path='/addPet' element={<AddPet />} />
                  <Route path='/profileVet' element={<ProfileVet />} />
                  <Route path='/detailsVet/:id' element={<DetailsV />} />
                  <Route path="/details/:id" element={<Details/>}/>
                  <Route path="/viewShelter/:id" element={<ViewShelter/>}/>
                </Route>
            </Routes>
        </Router>
    </div>
  );
}

export default App;
