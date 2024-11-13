import React from 'react'
// import {Outlet ,createBrowserRouter, RouterProvider} from 'react-router-dom'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './components/Login'
import Header from './Header'
import Dashboard from './components/Dashboard/SideNavBar'
import Signup from './components/Signup'

const App = () => {
 
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
    <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />

    </Routes>
  </BrowserRouter>

    // <div>
    //   <Header/>
    //   <RouterProvider router={appRouter}/>
    //   {/* <div>footer</div> */}
    // </div>
     
  )
}

export default App;


