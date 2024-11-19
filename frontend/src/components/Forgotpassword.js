import React from 'react';
// import '/src/assets/css/bootstrap/bootstrap.min.css';

const Forgotpassword = () => {
  return (

        <div className="container centered">
            <form action="/forgotpassword" method="POST">
                <fieldset className="shadow-sm mb-5 bg-white loginform">

                    <h3 className='heading_form'>Forgot Password</h3>
                    <p className="f-small themetext mt-2">Please enter your Details </p>
           
                    <input type="email" name="username" required placeholder= "Your Email"/>
                    

                    <button type="submit" className="btn loginbtn">Submit</button>
                   
        </fieldset>
            </form>
        
    </div>

  )
}

export default Forgotpassword