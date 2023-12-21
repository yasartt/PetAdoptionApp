import React, { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import davsan from './../davsan.jpeg';
import {Link } from "react-router-dom";
import axios from 'axios';

function MyApplications() {
    const [applications, setApplications] = useState([]);
    const [declines, setDeclines] = useState([]);
    
    const adopterId = localStorage.getItem('userId');

    useEffect(() => {
        axios.get(`https://localhost:7073/api/PetAdopter/GetApplicationsByAdopterId/${adopterId}`)
            .then(response => {
                setApplications(response.data);
            });

        axios.get(`https://localhost:7073/api/PetAdopter/GetDeclinesByAdopterId/${adopterId}`)
            .then(response => {
                setDeclines(response.data);
            });
    }, []);

    return (
        <Tabs>
            <TabList>
                <Tab>Applications</Tab>
                <Tab>Declines</Tab>
            </TabList>

            <TabPanel>
            <p className="text-center text-lg font-bold">Pending Applications</p>
            {applications.map(application => (
                            <Link to={`/details/${application.petId}`} className="flex flex-row bg-bunny-100 border-2 border-bunny-400 rounded-xl m-4">

                <div >
                <div className="flex flex-row bg-bunny-100 border-2 border-bunny-400 rounded-xl m-4">
                <img src={davsan} alt="Davsan" className="w-1/4 rounded-l-lg overflow-clip"/>
                <div className="flex flex-col space-y-1 w-2/4 m-2 text-white justify-evenly">
                    <p className="bg-bunny-400 rounded-lg p-1">Name: {application.pet.name}</p>
                    <p className="bg-bunny-400 rounded-lg p-1">Type: {application.pet.breed}</p>
                    <div className="flex flex-row space-x-2 justify-around">
                        <p className="bg-bunny-400 rounded-lg p-1">Age: {application.pet.age}</p>
                        <p className="bg-bunny-400 rounded-lg p-1">Sex: {application.pet.gender}</p>
                    </div>                

                </div>
                <div className="flex flex-col w-1/4 space-y-1 justify-evenly p-1">
                    <p className="bg-bunny-400 rounded-lg p-1 text-white">Status: {application.pet.status}</p>
                </div>
            </div>
              </div>
              </Link>
            ))}
             
            </TabPanel>

            <TabPanel>
            <p className="text-center text-lg font-bold">Declined Applications</p>

            {declines.map(decline => (
                                            <Link to={`/details/${decline.petId}`} className="flex flex-row bg-bunny-100 border-2 border-bunny-400 rounded-xl m-4">

                <div >
                <div className="flex flex-row bg-bunny-100 border-2 border-bunny-400 rounded-xl m-4">
                <img src={davsan} alt="Davsan" className="w-1/4 rounded-l-lg overflow-clip"/>
                <div className="flex flex-col space-y-1 w-2/4 m-2 text-white justify-evenly">
                    <p className="bg-bunny-400 rounded-lg p-1">Name: {decline.pet.name}</p>
                    <p className="bg-bunny-400 rounded-lg p-1">Type: {decline.pet.breed}</p>
                    <div className="flex flex-row space-x-2 justify-around">
                        <p className="bg-bunny-400 rounded-lg p-1">Age: {decline.pet.age}</p>
                        <p className="bg-bunny-400 rounded-lg p-1">Sex: {decline.pet.gender}</p>
                    </div>                

                </div>
                <div className="flex flex-col w-1/4 space-y-1 justify-evenly p-1">
                    <p className="bg-bunny-400 rounded-lg p-1 text-white">Status: {decline.pet.status}</p>
                </div>
            </div>
              </div>
              </Link>

            ))}
             
            </TabPanel>
        </Tabs>
    );
}

export default MyApplications;