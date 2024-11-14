import React from 'react'
import {Outlet ,createBrowserRouter, RouterProvider} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Header from './Header'
import Signup from './components/Signup'
import Forgotpassword from './components/Forgotpassword'
import Dashboard from './components/Dashboard/SideNavBar'
import Test from './components/Test/Test'
import Forgotpassword from './components/Forgotpassword'
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
      path:'/signup',
      element:<Signup/>,
    },
    {
      path:'/forgotpassword',
      element:<Forgotpassword/>,
    },
    {
      path:'/dashboard',
      element:<Dashboard/>,
    },
    {
      path:'/test',
      element:<Test/>,
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