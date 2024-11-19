import React from 'react';
// import '/src/assets/css/bootstrap/bootstrap.min.css';

const Signup = () => {
  return (

        <div className="container centered">
            <form action="/signup" method="POST">
                <fieldset className="shadow-sm mb-5 bg-white loginform">

                    <h3 className='heading_form'>Sign Up</h3>
                    <p className="f-small themetext mt-2">Please enter your Details </p>
                    <input type="text" name="firstName" required placeholder= "First Name"/>
                    <input type="text" name="LastName" required placeholder= "Last Name"/>

                    <input type="email" name="username" required placeholder= "Your Email"/>
                    
                    <input type="password" name="password" required placeholder= "Password" />

                    <button type="submit" className="btn loginbtn">Sign Up</button>
                   
        </fieldset>
            </form>
        
    </div>

  )
}

export default Signup