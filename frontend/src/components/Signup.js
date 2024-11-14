import React, { useState } from "react";
import { useNavigate,Link } from "react-router-dom";

const Signup = () => {
    // State to hold form input values
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
      e.preventDefault();
      navigate("/home");

      console.log("First Name:", firstName);
      console.log("Last Name:", lastName);
      console.log("Email:", email);
      console.log("Password:", password);
    };

  return (

        <div className="container centered">
            <form onSubmit={handleSubmit}>

                <fieldset className="shadow-sm mb-5 bg-white loginform">

                    <h3 className='heading_form'>Sign Up </h3>
                    <p className="f-small">Please enter your details </p>
                    <input type="text" 
                    name="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    placeholder= "First Name"/>

                    <input type="text" 
                    name="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    placeholder= "Last Name"/>

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

                    <button type="submit" className="btn">Submit</button>
                   {/* <p className="forgotpswd"> <Link to="">Forgot password?</Link>  </p>  */}
                </fieldset>
            </form>
        
    </div>

  )
}

export default Signup;