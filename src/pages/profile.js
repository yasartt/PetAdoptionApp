//import './App.css';
import {Link } from "react-router-dom";
import davsan from './../davsan.jpeg';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState, useEffect } from "react";
import axios from "axios";
import { storage } from './../firebase'; // Import the storage instance
import { ref, uploadBytes, getStorage, getDownloadURL } from "firebase/storage";

function refreshPage() {
  window.location.reload(false);
}

function getDate(extra) {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate() + extra;
  return `${year}-${month}-${date}T`;
}

const formatDateString = (inputString) => {
  const [datePart, timePart] = inputString.split('T');
  const [year, month, day] = datePart.split('-');
  const formattedDate = `${day}/${month}/${year}`;
  return formattedDate;
};

function checkIfFileExists(filePath) {
  const storage = getStorage();
  const storageRef = ref(storage, `cu/${filePath}`);
  let annen = ""

  getDownloadURL(storageRef)
    .then(url => {
      annen = url
    })
    .catch(error => {
      if (error.code === 'storage/object-not-found') {
        annen = "cu"
      } else {
        annen = "cu"
      }
    });
    return annen
}


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
function Profile() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selected, setSelected] = useState(1)

  const [openC, setOpenC] = useState(false);
  const [id,setId] = useState()


  const handleSubmit = (hour) => {
    
    const newDate = `${dates[selected].name}${hour}:00`;
    const input = { shelterId: 1, petAdopterId: 32, date: newDate }
    axios.post(`https://localhost:7073/api/Shelter/AddAppointment`,input).then(response => {
      //setShelter(response.data)
      alert("Submit succeed bitch ass nigger")
    })
    refreshPage()
};

    const handleClickToOpen = () => {
        setOpenC(!openC);
    };
 
    const handleToClose = () => {
        setOpenC(false);
    };

    const handleId = (id) => {
      setId(id);
  };

  const [dates, setDates] = useState([]);


  const vets = [
    { id: 1, name: 'Salih' },
    { id: 2, name: 'Emre' },
    { id: 3, name: 'Abuzer' },
  ];

  const days = [
    { id: 1, name: 'Monday' },
    { id: 2, name: 'Tuesday' },
    { id: 3, name: 'Wednesday' },
    { id: 4, name: 'Thursday' },
    { id: 5, name: 'Friday' },
  ];

  const [urll,setUrl] = useState('')
  useEffect(() => {
    const storage = getStorage();
    const storageRef = ref(storage, `cu/${localStorage.getItem('userId')}`);

    getDownloadURL(storageRef)
      .then(url => {
        setUrl(url)
      })
      .catch(error => {
        if (error.code === 'storage/object-not-found') {
          setUrl("cu")
        } else {
          setUrl("cu")
        }
      });
      
    console.log(`annen: ${checkIfFileExists(localStorage.getItem('userId'))} ${urll}`)
  }, []);


  useEffect(() => {
    const generateDates = () => {
      
      const dateArray = [];
      let ct = 0
      for (let i = 0; i < 7; i++) {
        dateArray.push({ id: i, name: getDate(ct) })
        ct++
      }

      setDates(dateArray);
    };

    generateDates();
    console.log(dates)
  }, [selected]); // Run the effect only once when the component mounts

  //3 saat geri wtf
  const hours = [
    { id: 1, name: '10:00' },
    { id: 2, name: '11:00' },
    { id: 3, name: '12:00' },
    { id: 4, name: '13:00' },
    { id: 5, name: '14:00' },
    { id: 6, name: '15:00' },
    { id: 7, name: '16:00' },
  ];

  const pets = [
    { id: 1, name: 'Lion' },
    { id: 2, name: 'Elephant' },
    { id: 3, name: 'Giraffe' },
  ];

  
  const [busy, setBusy] = useState([])

  const [shelter, setShelter] = useState()
  useEffect(() => {
    
    axios.get(`https://localhost:7073/api/Pet/GetShelterByPetId/${1}`).then(response => {
      setShelter(response.data)
    })
    
  }, []);

  useEffect(() => {
    
    axios.get(`https://localhost:7073/api/Shelter/GetShelterBusyHours/${1}`).then(response => {
      setBusy(response.data.appointments)
      console.log(response.data.appointments)
    })
    
    
  }, [id ]);

  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (file) {
      const storage = getStorage();
      const storageRef = ref(storage, `cu/${localStorage.getItem('userId')}`);

      // 'file' comes from the Blob or File API
      uploadBytes(storageRef, file).then((snapshot) => {
        alert('Upload Successfull');
      });
    } else {
      alert('No file selected');
    }
  };
    
  const isBusy = (hour) => {
    const newDate = new Date(`${dates[selected].name}${hour}:00`);
    
    // Check if newDate is in the busy array
    const isDateBusy = busy.some(busyDate => {
        const busyDateObject = new Date(busyDate.appointmentDate);
        
        

        return busyDateObject.getTime() === newDate.getTime();
    });


    return isDateBusy;
  }

  return (
    <div className="flex flex-col items-center space-y-3 p-3">

       <p>Name:</p>
       <p>Adoption Information</p>

       {pets.map(animal => (
              <div key={animal.id} className="flex flex-col items-center w-5/6">
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
                    <button onClick={() => {handleId(animal.id);  handleClickToOpen()}} className="bg-bunny-500 rounded-lg p-1 text-white">Schedule</button>
                    <button onClick={handleOpen} className="bg-bunny-500 rounded-lg p-1 text-white">Vet App.</button>
                </div>
            </div>
              {openC && id===animal.id && (
                <div className="flex flex-col bg-bunny-100 rounded-lg p-5 w-5/6">
                  <div className="flex flex-row space-x-1 overflow-scroll">
                  {dates.map(animal => (
                    <button onClick={() => setSelected(animal.id)} key={animal.id} className="text-white">
                      {selected !== animal.id && (<p className="bg-bunny-400  p-2 rounded-lg">{formatDateString(animal.name)}</p>)}
                      {selected === animal.id && (<p className="bg-bunny-200 border-bunny-400 border-2  p-2 rounded-lg">{formatDateString(animal.name)}</p>)}
                    </button>
                  ))}
                  </div>
                  <div className="grid grid-cols-3 gap-4 mt-5">
                  {hours.map(animal => (
                      <div>
                        { isBusy(animal.name) && (<div key={animal.id} className="bg-bunny-500 text-white rounded-md text-center">
                          Busy
                        </div>)}
                        { !isBusy(animal.name) && (<button onClick={() => {handleSubmit(animal.name)}} key={animal.id} className="bg-bunny-300 text-white rounded-md text-center">
                          {animal.name}
                        </button>)}
                      </div>
                    ))}
                  </div>
              </div>
              )}
              </div>

       
      
              
            ))}
       
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2" className="flex justify-center">
              List of Vets
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }} className="flex flex-col items-center space-y-4">
            {vets.map(animal => (
              <div key={animal.id}>
                <Link to={`/detailsVet/${animal.id}`} className="flex flex-row bg-bunny-100 rounded-lg border-2 border-bunny-300 justify-between">
                <div className="flex flex-col p-2 w-3/4text-left">
                    <p>Vet Name: {animal.name} </p>
                    <p>Location: </p>
                </div>
                <div className="flex bg-bunny-400 rounded-r-sm w-1/4 items-center justify-center text-white">CU</div>
            </Link> 
              </div>
            ))}
            
            </Typography>
          </Box>
        </Modal>

        <p className="">Your resume:</p>
        <p>Upload Resume</p>
        
        <p>{localStorage.getItem('userId')}</p>

        {urll === "cu" && (<div>
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleUpload}>Upload</button>
        </div> )}

        
        <div>
          <a href={urll}>tikla oc</a>
        </div> 

        
        </div>
        
  );
}

export default Profile;
