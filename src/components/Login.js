import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const[credentials,setCredentials]=useState({email:"",password:""});
    const navigate = useNavigate();
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
      }
    
    const handleSubmit= async (e)=>{
      e.preventDefault();
      var response = await fetch("http://localhost:5000/api/auth/login", {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json', 
        },
        body:JSON.stringify({email:credentials.email,password:credentials.password})
      
      });
      const JSON1=await response.json();
      console.log(JSON1);
      if(JSON1.success)
      {
          //re direct
          localStorage.setItem('token',JSON1.authtoken);
          navigate('/');

      }
      else{
          alert("access denied:invalid credentials");
      }
    }
    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit} >
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" value={credentials.email} onChange={onChange} name="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" onChange={onChange} value={credentials.password} id="exampleInputPassword1" />
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">are you having a good day</label>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login