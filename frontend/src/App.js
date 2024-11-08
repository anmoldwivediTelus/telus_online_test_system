import React from 'react'
import {Outlet ,createBrowserRouter, RouterProvider} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Header from './Header'
const App = () => {
  const appRouter  = createBrowserRouter([
    {
      path:'/',
      element:<Home/>,
    },
    {
      path:'/login',
      element:<Login/>
    },
  ])
  return (
    <div>
      <Header/>
      <RouterProvider router={appRouter}/>
      <div>footer</div>
    </div>
     
  )
}

export default App;