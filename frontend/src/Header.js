import React from 'react';
import user from './assets/img/user.png'
import './assets/css/bootstrap-css/bootstrap.min.css'
import {Link} from 'react-router-dom';

import ti_logo from './assets/img/telus_logo_digital.svg';

const Header = () => {
  return (
   <div class="row headbar">
    <header className="d-flex flex-wrap align-items-center py-3 mb-4 border-bottom">
      <div className ="logo col-md-5">
         <img className="telus-logo" alt="Telus logo" src= {ti_logo} />
        </div>      

      <div className="nav col-md-6 mb-md-0">
      <div className ="app-title-header themetext">TELUS Digital Online Test</div>

      </div>

      {/* <div class="dropdown text-end col-md-1">
          <a href="" class="d-block link-dark text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
            <img src={user} alt="mdo" width="32" height="32" class="rounded-circle" />
          </a>
          <ul class="dropdown-menu text-small" aria-labelledby="dropdownUser1">
            <li><a class="dropdown-item">Settings</a></li>
            <li><a class="dropdown-item">Profile</a></li>
           
          </ul>
      </div> */}
    </header>
  </div>




        /* <div className ="logo">
         <img className="telus-logo" alt="Telus logo" src= {ti_logo} />
        </div>
        <div className ="page-headers ">
          <div className ="app-title-header themetext">TELUS Digital Online Test</div>
        </div>
        <div className='textRight'>
          <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <img src={user} alt="user-img"/>
            </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item">Action</a>
                <a class="dropdown-item">Another action</a>
                <a class="dropdown-item">Something else here</a>
              </div>
          </div>
        </div>
	  </div> */
    // </header>
    // </div>
  )
}

export default Header