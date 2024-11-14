import React from 'react';
import ti_logo from './assets/img/telus_logo_digital.svg';

const Header = () => {
  return (
    <div className = "">
       <header>
        <div className ="logo container-fluid">
		<img className="telus-logo" alt="Telus logo" src= {ti_logo} />
		<div id="userinfo_banner"></div>
            <div className ="page-headers ">
                <div className ="app-title-header themetext">TELUS ONLINE TEST</div>
            </div>
            <div className='textRight'>
              
            </div>
	</div>
    </header>
    </div>
  )
}

export default Header