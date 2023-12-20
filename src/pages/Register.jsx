import { useState,useEffect } from 'react';
import logo from './../rabbit.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Register({accIndex}) {
    const navigate = useNavigate();
    const [formError, setFormError] = useState('');

    const [formData0, setFormData0] = useState({
        name: '',
        address: '',
        age: '', // Only for accIndex == 0
        //location: '', // Only for accIndex == 2
        //specialization: '', // Only for accIndex == 2
        username: '',
        password: ''
    });

    const handleChange0 = (e) => {
        setFormData0({
            ...formData0,
            [e.target.name]: e.target.value
        });
        if(e.target.name === "username"){
            setuserNameError("");
        }
    };

    const handleSubmit0 = (e) => {
        e.preventDefault();
        // Handle form submission, e.g., send data to a server or API
        console.log('Adopter:', formData0);
        if (!formData0.name || !formData0.address || !formData0.age || !formData0.username || !formData0.password) {
            setFormError("Fill in all inputs");
            return;
        }

        axios.post('https://localhost:7073/api/User/RegisterAdopter', formData0)
    .then(response => {
        // �stek ba�ar�l� oldu�unda buras� �al���r
        setuserNameError("");
        navigate('/auth', { state: { message: "Successfully registered. Now login." } });
        //alert("Ba�ar�l�");
    })
    .catch(error => {
        // �stek ba�ar�s�z oldu�unda buras� �al���r
        if (error.response && error.response.status === 409) {
            // 409 Conflict durumu i�in �zel bir i�lem yapabilirsiniz
            setuserNameError(error.response.data)
            //alert(error.response.data);
        } else {
            setuserNameError(error.response.data)
            // Di�er t�m hatalar i�in genel bir i�lem
            //alert("Ba�ar�s�z: Bir hata olu�tu");
        }
    });
    setFormError(""); // Clear any previous error message
    };
    const [formData1, setFormData1] = useState({
        name: '',
        address: '',
        username: '',
        password: ''
    });

    const [usernameError,setuserNameError] = useState("");

    const handleChange1 = (e) => {
        setFormData1({
            ...formData1,
            [e.target.name]: e.target.value
        });
        if (e.target.name === 'username') {
            setuserNameError("");
        }
    };

    const handleSubmit1 = (e) => {
        e.preventDefault();
        console.log('Shelter:', formData1);
        if (!formData1.name || !formData1.address ||  !formData1.username || !formData1.password) {
            setFormError("Fill in all inputs");
            return;
        }
        // Add your form submission logic here
        axios.post('https://localhost:7073/api/User/RegisterShelter', formData1)
        .then(response => {
            // �stek ba�ar�l� oldu�unda buras� �al���r
            setuserNameError("");
            navigate('/auth', { state: { message: "Successfully registered. Now login." } });
            //alert("Ba�ar�l�");
        })
        .catch(error => {
            // �stek ba�ar�s�z oldu�unda buras� �al���r
            if (error.response && error.response.status === 409) {
                // 409 Conflict durumu i�in �zel bir i�lem yapabilirsiniz
                setuserNameError(error.response.data)
                //alert(error.response.data);
            } else {
                setuserNameError(error.response.data)
                // Di�er t�m hatalar i�in genel bir i�lem
                //alert("Ba�ar�s�z: Bir hata olu�tu");
            }
        });
        setFormError(""); // Clear any previous error message


    };
    const [formData2, setFormData2] = useState({
        name: '',
        location: '',
        specialization: '',
        username: '',
        password: ''
    });

    const handleChange2 = (e) => {
        setFormData2({
            ...formData2,
            [e.target.name]: e.target.value
        });
        if (e.target.name === 'username') {
            setuserNameError("");
        }
    };

    const handleSubmit2 = (e) => {
        e.preventDefault();
        console.log('Form Data:', formData2);
        if (!formData2.name || !formData2.location || !formData2.specialization|| !formData2.username || !formData2.password) {
            setFormError("Fill in all inputs");
            return;
        }
        // Add your form submission logic here
        axios.post('https://localhost:7073/api/user/RegisterVet', formData2)
        .then(response => {
            // �stek ba�ar�l� oldu�unda buras� �al���r
            setuserNameError("");
            navigate('/auth', { state: { message: "Successfully registered. Now login." } });
            //alert("Ba�ar�l�");
        })
        .catch(error => {
            // �stek ba�ar�s�z oldu�unda buras� �al���r
            if (error.response && error.response.status === 409) {
                // 409 Conflict durumu i�in �zel bir i�lem yapabilirsiniz
                setuserNameError(error.response.data)
                //alert(error.response.data);
            } else {
                setuserNameError(error.response.data)
                // Di�er t�m hatalar i�in genel bir i�lem
                //alert("Ba�ar�s�z: Bir hata olu�tu");
            }
        });
        setFormError(""); // Clear any previous error message
    };

  return (
    <div className="Auth">
        <div className="flex flex-col justify-center items-center space-y-4">

            <div className="flex flex-col justify-center space-y-3" >
            {usernameError && <div className="text-red-500 bg-red-100 border border-red-500 p-2 rounded">{usernameError}</div>}

            <div className="flex flex-col justify-center space-y-3">
                {(accIndex == 0) && (
                <form className="flex flex-col items-center" onSubmit={handleSubmit0}>
                <label className="self-start text-sm">Name:</label>
                <input
                    className="rounded-lg bg-bunny-100 p-1"
                    type="text"
                    name="name"
                    value={formData0.name}
                    onChange={handleChange0}
                    placeholder="Name"
                />

                <label className="self-start text-sm">Address:</label>
                <input
                    className="rounded-lg bg-bunny-100 p-1"
                    type="text"
                    name="address"
                    value={formData0.address}
                    onChange={handleChange0}
                    placeholder="Address"
                />

                <label className="self-start text-sm">Age:</label>
                <input
                    className="rounded-lg bg-bunny-100 p-1"
                    type="number"
                    name="age"
                    value={formData0.age}
                    onChange={handleChange0}
                    placeholder="Age"
                />

                <label className="self-start text-sm">Username:</label>
                <input
                    className="rounded-lg bg-bunny-100 p-1"
                    type="text"
                    name="username"
                    value={formData0.username}
                    onChange={handleChange0}
                    placeholder="Username"
                />

                <label className="self-start text-sm">Password:</label>
                <input
                    className="rounded-lg bg-bunny-100 p-1"
                    type="password"
                    name="password"
                    value={formData0.password}
                    onChange={handleChange0}
                    placeholder="Password"
                />

                <button
                    className="p-3 bg-bunny-400 rounded-2xl text-white cursor-pointer"
                    type="submit"
                >
                    Sign Up
                </button>
            </form>
                )}

            {(accIndex == 1) && (
                <form className="flex flex-col items-center" onSubmit={handleSubmit1}>
                    <label className="self-start text-sm">Name:</label>
                    <input
                        className="rounded-lg bg-bunny-100 p-1"
                        type="text"
                        name="name"
                        value={formData1.name}
                        onChange={handleChange1}
                        placeholder="Name"
                    />

                    <label className="self-start text-sm">Address:</label>
                    <input
                        className="rounded-lg bg-bunny-100 p-1"
                        type="text"
                        name="address"
                        value={formData1.address}
                        onChange={handleChange1}
                        placeholder="Address"
                    />

                    <label className="self-start text-sm">Username:</label>
                    <input
                        className="rounded-lg bg-bunny-100 p-1"
                        type="text"
                        name="username"
                        value={formData1.username}
                        onChange={handleChange1}
                        placeholder="Username"
                    />

                    <label className="self-start text-sm">Password:</label>
                    <input
                        className="rounded-lg bg-bunny-100 p-1"
                        type="password"
                        name="password"
                        value={formData1.password}
                        onChange={handleChange1}
                        placeholder="Password"
                    />

                    <button
                        className="p-3 bg-bunny-400 rounded-2xl text-white cursor-pointer"
                        type="submit"
                    >
                        Sign Up
                    </button>
                </form>
                )}

                {(accIndex == 2) && (
                    //name location spezilization username passowrd
                    <form className="flex flex-col items-center" onSubmit={handleSubmit2}>
                    <label className="self-start text-sm">Name:</label>
                    <input
                        className="rounded-lg bg-bunny-100 p-1"
                        type="text"
                        name="name"
                        value={formData2.name}
                        onChange={handleChange2}
                        placeholder="Name"
                    />

                    <label className="self-start text-sm">Location:</label>
                    <input
                        className="rounded-lg bg-bunny-100 p-1"
                        type="text"
                        name="location"
                        value={formData2.location}
                        onChange={handleChange2}
                        placeholder="Location"
                    />

                    <label className="self-start text-sm">Specialization:</label>
                    <input
                        className="rounded-lg bg-bunny-100 p-1"
                        type="text"
                        name="specialization"
                        value={formData2.specialization}
                        onChange={handleChange2}
                        placeholder="Specialization"
                    />

                    <label className="self-start text-sm">Username:</label>
                    <input
                        className="rounded-lg bg-bunny-100 p-1"
                        type="text"
                        name="username"
                        value={formData2.username}
                        onChange={handleChange2}
                        placeholder="Username"
                    />

                    <label className="self-start text-sm">Password:</label>
                    <input
                        className="rounded-lg bg-bunny-100 p-1"
                        type="password"
                        name="password"
                        value={formData2.password}
                        onChange={handleChange2}
                        placeholder="Password"
                    />

                    <button
                        className="p-3 bg-bunny-400 rounded-2xl text-white cursor-pointer"
                        type="submit"
                    >
                        Sign Up
                    </button>
                </form>
                )}
            </div>
            {formError && <div className="text-red-500">{formError}</div>}
        </div>
    </div>                    
    </div>
    )

}

export default Register;