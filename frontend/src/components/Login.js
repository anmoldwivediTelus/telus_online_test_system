import React from 'react';
import { useNavigate } from 'react-router-dom';

// import '/src/assets/css/bootstrap/bootstrap.min.css';

const Login = () => {
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate('/signup');
  };
  const handleForgotpasswordClick =() =>{
    navigate('/forgotpassword');

  }
  return (

        <div className="container centered">
            <form action="/login" method="POST">
                <fieldset className="shadow-sm mb-5 bg-white loginform">

                    <h3 className='heading_form'>Log in </h3>
                    <p className="f-small themetext mt-2">Please enter your login and password </p>

                    <input type="email" name="username" required placeholder= "Your Email"/>
                    
                    <input type="password" name="password" required placeholder= "Password" />

                    <button type="submit" className="btn loginbtn">Login</button>
                   
                      <div className="mt-4">
                        <div className="d-flex links dark">
                          Don't have an account?<a className="ml-2 themetext bold" onClick={handleSignUpClick}>Sign Up</a>
                        </div>
                        <div className="d-flex themetext links mt-2">
                          <a className="bold" onClick={handleForgotpasswordClick} >Forgot your password?</a>
                        </div>
                      </div>
        </fieldset>
            </form>
        
    </div>

  )
}

export default Login