import React, { useEffect, useState } from 'react';
import axios from 'axios'

const SelectAppointment = ({ props }) => {

  // propsla veteriner ve pet id gelecek veya shelter ve petAdopter id gelecek

  const [seciliSeans, setSeciliSeans] = useState(0);
  const [seciliGun, setSeciliGun] = useState(0);
  const [seciliHafta, setSeciliHafta] = useState({
    haftaNumarasi: 0, // You can set the initial week number as needed
    baslangicTarihi: new Date('2023-12-11'), // Set the initial start date
    bitisTarihi: new Date('2023-12-17'), // Set the initial end date
  });

  const [trigger, setTrigger] = useState(0);

  const Weekdays = {
    0: 'Monday',
    1: 'Tuesday',
    2: 'Wednesday',
    3: 'Thursday',
    4: 'Friday',
    5: 'Saturday',
    6: 'Sunday',
  };

  const HourNames = {
    0: '09:00-09:30',
    1: '09:30-10:00',
    2: '10:00-10:30',
    3: '10:30-11:00',
    4: '11:00-11:30',
    5: '11:30-12:00',
    6: '12:00-12:30',
    7: '12:30-13:00',
    8: '13:00-13:30',
    9: '13:30-14:00',
    10: '14:00-14:30',
    11: '14:30-15:00',
    12: '15:00-15:30',
    13: '15:30-16:00',
    14: '16:00-16:30',
    15: '16:30-17:00',
    16: '17:00-17:30',
    17: '17:30-18:00',
    18: '18:00-18:30',
    19: '18:30-19:00',
    20: '19:00-19:30',
    21: '19:30-20:00',
  };

useEffect(() => {
    // call to the api with veterinarian id to get the available appointment hours with seciliGun and seciliSeans

    axios.get(`https://localhost:7073/api/Veterinarian/GetVetBusyHours/${props.vetId}`
        ).then(response => {

        });
  }, [trigger]);

  const calculateDateRange = (hafta) => {
    const today = new Date();
    const startDate = new Date(today);
    const endDate = new Date(today);
  
  
    const daysToAdd = 1 - today.getDay() + (hafta * 7);
    const daysToAddEnd = 1 - today.getDay() + (hafta * 7) + 6;
  
    startDate.setDate(today.getDate() + daysToAdd);
    endDate.setDate(today.getDate() + daysToAddEnd);
  
    const startMonth = startDate.toLocaleString('en-US', { month: 'short' });
    const endMonth = endDate.toLocaleString('en-US', { month: 'short' });

    
    //setHaftaninIlkGunu(startDate);
    //setHaftaninSonGunu(endDate);
  
    return `${startDate.getDate()} ${startMonth} - ${endDate.getDate()} ${endMonth}`;
  };
  

  const ButtonSet = ({ gunIndex }) => (
    <div style={{ display: 'inline-block', margin: '0 10px' }}>
      <h3 style={{ fontFamily: 'Helvetica', fontSize: '13px', textAlign: 'center' }}>
        {Weekdays[gunIndex]}
      </h3>
      {[...Array(22)].map((_, saatIndex) => (
        <button
          key={saatIndex}
          style={isItAvailable(gunIndex, saatIndex) ? buttonStyleAvailable : buttonStyleDisabled}
          disabled={!isItAvailable(gunIndex, saatIndex)}
          onClick={() => handleSecim(gunIndex, saatIndex)}
        >
           <p style={{ fontSize: 'small' }}>{HourNames[saatIndex]}</p>
        </button>
      ))}
    </div>
  );

  const isItAvailable = (gunIndex, saatIndex) => {

    const today = new Date();
    const selectedDate = new Date(seciliHafta.baslangicTarihi)

    selectedDate.setDate(seciliHafta.baslangicTarihi.getDate() + gunIndex);

    console.log('Selected date:', selectedDate);
    console.log('Baslangic Tarihi:', seciliHafta.baslangicTarihi);

    //selectedDate.setDate(today.getDate() + (gunIndex - today.getDay()) + seciliHafta.haftaNumarasi * 7);
    const selectedHour = (Math.floor(saatIndex/2)) + 9; // Assuming hours start from 9:00 AM

    
    if(selectedDate.getTime() > today.getTime()) {
      return true;
    }
    else{
      
      

      return false;
    }
    

    /*/ Compare the selected datetime with the current datetime
    if (
      selectedDate < today ||
      (selectedDate.getDate() === today.getDate() && selectedHour <= today.getHours())
    ) {
      return false; // Time is in the future or the current hour
    } else {
      return true; // Time has passed
    }*/

  };

  const handleSecim = (gunIndex, saatIndex) => {
    //api call to send application request to the api. Pet id, veterinarian id, selected date and time are needed
    const gonderilecekTarih = new Date(seciliHafta.baslangicTarihi.getTime() + gunIndex * 24 * 60 * 60 * 1000);
    
    gonderilecekTarih.setHours(saatIndex + 9);
    //console.log('Selected date:', seciliHafta.baslangicTarihi + gunIndex);
    console.log('Gonderilecek Tarih:', gonderilecekTarih);

    if(props.vetId){
      axios.post('https://localhost:7073/api/Veterinarian/AddAppointment', {
      randevuTarih: gonderilecekTarih,
      vetId: props.vetId,
      petId: props.petId,
    }).then(response => {
        setTrigger(trigger + 1);
        });
    }
    else if(props.shelterId){
      axios.post('https://localhost:7073/api/Shelter/AddAppointment', {
      randevuTarih: gonderilecekTarih,
      vetId: props.vetId,
      petId: props.petId,
    }).then(response => {
        setTrigger(trigger + 1);
        });
    }
    


    setSeciliGun(gunIndex);
    setSeciliSeans(saatIndex);
  };

  const handleIncreaseWeek = () => {
    setSeciliHafta(() => ({
      haftaNumarasi: seciliHafta.haftaNumarasi + 1,
      baslangicTarihi: new Date(seciliHafta.baslangicTarihi.getTime() + 7 * 24 * 60 * 60 * 1000),
      bitisTarihi: new Date(seciliHafta.bitisTarihi.getTime() + 7 * 24 * 60 * 60 * 1000),
    }));

    console.log('Increased to:', seciliHafta);
  };

  const handleDecreaseWeek = () => {
    setSeciliHafta(() => ({
      
      haftaNumarasi: seciliHafta.haftaNumarasi - 1,
      baslangicTarihi: new Date(seciliHafta.baslangicTarihi.getTime() - 7 * 24 * 60 * 60 * 1000),
      bitisTarihi: new Date(seciliHafta.bitisTarihi.getTime() - 7 * 24 * 60 * 60 * 1000),
    }));

    console.log('Decreased to:', seciliHafta);
  };
  const buttonStyleAvailable = {
    backgroundColor: 'purple',
    color: 'white',
    padding: '10px',
    border: 'none',
    borderRadius: '5px',
    width: '100px',
    height: '30px',
    cursor: 'pointer',
    display: 'block',
    margin: '5px 0 0 0',
  };

  const buttonStyleDisabled = {
    backgroundColor: 'grey',
    color: 'white',
    padding: '10px',
    border: 'none',
    borderRadius: '5px',
    width: '100px',
    height: '30px',
    cursor: 'pointer',
    display: 'block',
    margin: '5px 0 0 0',
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2 style={{ fontFamily: 'Helvetica', marginBottom: '10px' }}>Vet. Mehmet Dedeler</h2>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        <button onClick={handleDecreaseWeek}>&#8592; Previous Week</button>
        <h2 style={{ fontFamily: 'Helvetica' }}>{calculateDateRange(seciliHafta.haftaNumarasi)}</h2>
        <button onClick={handleIncreaseWeek}>Next Week &#8594;</button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        {[...Array(7)].map((_, index) => (
          <ButtonSet key={index} gunIndex={index} />
        ))}
      </div>
      
    </div>
  );
};

export default SelectAppointment;
