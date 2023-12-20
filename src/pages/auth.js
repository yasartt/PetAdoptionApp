import { useState,useEffect } from 'react';
import logo from './../rabbit.png';
import Register from './Register.jsx';
import axios from 'axios'
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function Auth() {
    const location = useLocation();
    const [registrationMessage, setRegistrationMessage] = useState('');
    const navigate = useNavigate();
    const [loginError,setLoginError] = useState("");

    useEffect(() => {
        // Check if there is a state with a message
        if (location.state?.message) {
            setLogin(true);
            setRegistrationMessage(location.state.message);
            // Optionally, clear the message from the location state
            location.state.message = '';
        }
    }, [location]);

    
    const [formValues, setFormValues] = useState({
        userType: '',
        username: '',
        password: ''
      });
      const handleInputChange = (e) => {
        //const { name, value } = e.target;
        setFormValues({
          ...formValues,
          [e.target.name]: e.target.value
        });
      };

      // Handle form submit
      const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        setRegistrationMessage('');
        setLoginError('');

        // TODO: Implement what should happen on form submit
        //console.log('Form submitted:', formValues);

        //axios.post('https://localhost:7073/api/User/Loginuser', formValues).then(response => {});


        axios.get(`https://localhost:7073/api/User/Loginuser/${formValues.userType}/${formValues.username}/${formValues.password}`)
        .then(response => {
            if(response.data.user === null || response.data.user === undefined){
                setLoginError('Login failed');

            }else{
                localStorage.setItem('userId', response.data.user.userId);
                localStorage.setItem('userType', formValues.userType);
                localStorage.setItem('username', response.data.username);

               console.log('Login successful:', response.data);
            navigate('/'); 
            }

            


        })
        .catch(error => {
            setLoginError('Login failed'); // Set login error message
            console.log('Login failed:', error);

        })



        // You might want to call an API to submit these values
        // or dispatch an action if using Redux, for example.
      };
    const [isLogin,setLogin] = useState(true);
    const [acc,setAcc] = useState(0)

    const addrtype = ["Adopter", "Shelter", "Veterinarian"]

    const Add = addrtype.map(Add => Add
    )
    const handleAddrTypeChange = (e) => setAcc(e.target.value)


//for login
    const [accLogin,setAccLogin] = useState(0)

    const addrtypeLogin = ["Adopter", "Shelter", "Veterinarian","Admin"]

    const AddLogin = addrtypeLogin.map(AddLogin => AddLogin)

    const handleAddrTypeChangeLogin = (e) => {
        const newAccLogin = e.target.value;
        setAccLogin(newAccLogin);
        setFormValues({
            ...formValues,
            userType: addrtypeLogin[newAccLogin]
        });
    };
//
        useEffect(() => {
            setAccLogin(0)
            setFormValues({
                ...formValues,
                userType: addrtypeLogin[0]
            });

        },[])

        useEffect(() => {
            setAcc(0)
        }, [isLogin]);

    useEffect(() => {
    // When isLogin is set to false, clear the registration message
    if (!isLogin) {
        setRegistrationMessage('');
        setLoginError('');
    }
    }, [isLogin]);

    useEffect(() => {
        // When isLogin is set to false, clear the registration message
        if (isLogin) {
            setLoginError('');
        }
    }, [isLogin]);

  return (
    <div className="Auth">
        <div className="flex flex-col justify-center items-center space-y-4">

        <img src={logo} alt="Davsan" className="overflow-visible ml-1 z-50 h-24 p-2"/>

            <div className="flex flex-row mt-5">
                {!isLogin && (<button onClick={() => setLogin(true)} className="bg-bunny-200 px-3 py-1 rounded-2xl text-white mr-5">Login</button>)}
                {isLogin && (<button  className="bg-bunny-300 px-3 py-1 rounded-2xl text-white mr-5">Login</button>)}
                {isLogin && (<button onClick={() => setLogin(false)} className="bg-bunny-200 px-3 py-1 rounded-2xl text-white ml-5">Register</button>)}
                {!isLogin && (<button className="bg-bunny-300 px-3 py-1 rounded-2xl text-white ml-5">Register</button>)}

            </div>

            {!isLogin && (
            < select
                onChange={e => handleAddrTypeChange(e)}
                className="border-2 rounded-lg border-slate-800 p-1" >
                {
                    Add.map((address, key) => <option value={key}>{address}</option>)
                }
            </select >)}
            
            {isLogin && (<p>Sign in to your account</p>)}

            {registrationMessage && <div className="text-green-500 bg-green-100 border border-green-500 p-2 rounded">{registrationMessage}</div>}
            {loginError && (
                <div className="text-red-500 bg-red-100 border border-red-500 p-2 rounded">
                    {loginError}
                </div>
            )}

            {!isLogin && (<p>Sign up for {addrtype[acc]} account</p>)}
            {isLogin && (
            <div className="flex flex-col justify-center space-y-3">
                <form className="flex flex-col items-center" onSubmit={handleSubmit}>

                    < select
                        onChange={e => handleAddrTypeChangeLogin(e)}
                        className="border-2 rounded-lg border-slate-800 p-1" >
                        {
                            AddLogin.map((address, key) => <option value={key}>{address}</option>)
                        }
                    </select >
                    
                    <label className="self-start text-sm">Username:</label>
                    <input 
                        className="rounded-lg bg-bunny-100 p-1"  
                        type="text"
                        name="username" // Added name attribute
                        value={formValues.username} 
                        onChange={handleInputChange}
                    /> 
                    <label className="self-start text-sm">Password:</label>
                    <input  
                        className="rounded-lg bg-bunny-100 p-1" 
                        type="password"
                        name="password" // Changed to password and added name attribute
                        value={formValues.password} // Changed to password
                        onChange={handleInputChange}
                    /> 
                    {isLogin ? (
                        <button
                            className="p-3 bg-bunny-400 rounded-2xl text-white cursor-pointer"
                            type="submit" // Added type submit for proper form submission
                        >
                            Login
                        </button>
                    ) : (
                        <button
                            className="p-3 bg-bunny-400 rounded-2xl text-white cursor-pointer"
                            type="submit" // Added type submit for proper form submission
                        >
                            Register
                        </button>
                    )}
                </form>

            </div>
            )}
            {!isLogin &&(
            <Register accIndex={acc}>

            </Register>
        )}
        </div>
    </div>                    
    )

}

export default Auth;