import React, { useState } from "react";
import { useNavigate,Link } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
      e.preventDefault();
      navigate("/dashboard");

     
      console.log("Email:", email);
      console.log("Password:", password);
    };

  return (

        <div className="container centered">
            <form onSubmit={handleSubmit}>

                <fieldset className="shadow-sm mb-5 bg-white loginform">

                    <h3 className='heading_form'>Log in </h3>
                    <p className="f-small">Please enter your login and password </p>

                    <input type="email" 
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder= "Your Email"/>
                    
                    <input type="password" 
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                    placeholder= "Password" />

                    <button type="submit" className="btn">Login</button>
                   <p className="forgotpswd"> <Link to="" className="bold">Forgot password?</Link> or <Link to='/Signup' className="bold underline">Sign Up</Link>  </p> 

                </fieldset>
            </form>
        
    </div>

  )
}

export default Login