import { useNavigate } from "react-router-dom";
import React,{ useState } from 'react';

const SignUp = (props) => {
  const[credentials,setCredentials]=useState({name:"",email:"",password:"",cpassword:""});
  const navigate = useNavigate();
 
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {name,email,password}=credentials;
    var response = await fetch("http://localhost:5000/api/auth/createUser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name,email, password })

    });
    const JSON1 = await response.json();
    console.log(JSON1);
      //re direct
      if(JSON1.success){
      localStorage.setItem('token', JSON1.authtoken);
      props.showAlert("Congratulations Account Created Successfully ","success")
      navigate('/');
      }
      else{
      
        props.showAlert("Invalid Credentials","ERROR!!!")
      }
  
  }
  return (
    <>
      <h1>SignUp</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label"> Name:</label>
          <input type="text" className="form-control" id="name" name="name" onChange={onChange} aria-describedby="emailHelp"   required />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address:</label>
          <input type="email" className="form-control" onChange={onChange} name="email" id="email"   required aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password:</label>
          <input type="password" onChange={onChange} name="password" className="form-control" minLength={5} required id="password" />
          <div id="emailHelp" className="form-text">Don't be Too Creative</div>
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Cofnirm Password:</label>
          <input type="password" onChange={onChange} name="cpassword" className="form-control" minLength={5}  required id="cpassword" />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </>
  )
}

export default SignUp