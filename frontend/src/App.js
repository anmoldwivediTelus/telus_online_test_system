import React from 'react'
import {Outlet ,createBrowserRouter, RouterProvider} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Header from './Header'
import Dashboard from './components/Dashboard/SideNavBar'
const App = () => {
  const appRouter  = createBrowserRouter([
    {
      path:'/home',
      element:<Home/>,
    },
    {
      path:'/',
      element:<Login/>
    },
    {
      path:'/dashboard',
      element:<Dashboard/>,
    },
  ])
  return (
    <div>
      <Header/>
      <RouterProvider router={appRouter}/>
      {/* <div>footer</div> */}
    </div>
     
  )
}

export default App;