import React from 'react';
import ti_logo from './assets/img/telus_logo_digital.svg';
import user from './assets/img/user.png';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Header = ({ userId }) => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    console.log(userId)
    // Fetch user info from the API
    axios.get(`http://localhost:4000/api/users/${userId}`)
      .then(response => {
        setUserName(response.data.name);
        console.log('Fetched userName:', response.data.name);  // Assuming the response contains 'name' field
      })
      .catch(error => {
        console.error('Error fetching user info:', error);
      });
  }, [userId]);

  return (
<div className ="flex-container">
    <div className ="logo flex-item-left">
		  <img className="telus-logo" alt="Telus logo" src= {ti_logo} />
    </div>
    {/* <div className ="page-headers flex-item-center">
      <div className ="app-title-header themetext">TELUS ONLINE TEST</div>
    </div> */}
    <div className='flex-item-right'>
    <div className="flex-shrink-0 dropdown">
          <a className="link-dark text-decoration-none dropdown-toggle" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
            <img src={user} alt="mdo" width="32" height="32" className="rounded-circle" /> Hello {userName || 'User'} 
          </a>
          {/* <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
            <li><a className="dropdown-item" >Settings</a></li>
            <li><a className="dropdown-item" >Profile</a></li>
            <li><a className="dropdown-item" >Sign out</a></li>
          </ul> */}
        </div>
         </div>
	</div>
  )
}

export default Header