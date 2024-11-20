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
import ExitPage from './components/Test/Exitpage'
import OnlineTestInstructions from './components/Dashboard/OnlineTestInstructions'
import UserList from './components/Admin/UserList'
import AdminQuestion from './components/Admin/AdminQuestion'
import AdminQuestions from './components/Admin/AdminQuestions'

// import UserList from './components/Admin/UserList'
const App = () => {
  const appRouter  = createBrowserRouter([
    {
      path:'/',
      element:<OnlineTestInstructions/>
    },
    {
      path:'/admin',
      element:<UserList/>,
    },
    {
      path:'/exit',
      element:<ExitPage/>,
    },
    {
      path:'/test',
      element:<Test/>,
    },
    {
      path:'/question',
      element:<AdminQuestion/>,
    },
    {
      path:'/questions',
      element:<AdminQuestions/>,
    }
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