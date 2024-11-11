import React from 'react';

const Login = () => {
  return (

        <div className="container centered">
            <form action="/login" method="POST">
                <fieldset className="shadow-sm mb-5 bg-white loginform">

                    <h3 className='heading_form'>Log in </h3>
                    <p className="f-small">Please enter your login and password </p>

                    <input type="text" name="username" required placeholder= "Your Email"/>
                    
                    <input type="password" name="password" required placeholder= "Password" />

                    <button type="submit" className="btn">Login</button>
                   <p className="forgotpswd"> <a>Forgot password? </a>  </p> 
                </fieldset>
            </form>
        
    </div>

  )
}

export default Login