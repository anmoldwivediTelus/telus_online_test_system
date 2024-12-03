import React from 'react'
import {Outlet ,createBrowserRouter, RouterProvider, useNavigate, useParams } from 'react-router-dom'
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
import RecruiterHomepage from './components/Admin/RecruiterHomepage'
// import UserList from './components/Admin/UserList'


 // Layout with Header
const LayoutWithHeader = () => (
  <div>
    <Header />
    <Outlet /> {/* Renders the current route */}
  </div>
);

// Layout without Header
const LayoutWithoutHeader = () => (
  <div>
    <Outlet /> {/* Renders the current route */}
  </div>
);
// Component to handle redirection
const RedirectToTest = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    navigate(`/test/${id}`); // Redirect to the test page
  }, [id, navigate]);

  return null;
};

  const appRouter  = createBrowserRouter([
    {
      element: <LayoutWithHeader />, // Default layout with Header
      children: [
        {
          path: '/',
          element: <OnlineTestInstructions />,
        },
        {
          path: '/admin',
          element: <RecruiterHomepage />,
        },
        {
          path: '/exit',
          element: <ExitPage />,
        },
        {
          path: '/question',
          element: <AdminQuestion />,
        },
      ],
    },

    // without Header
   {
    element: <LayoutWithoutHeader />, 
    children: [
      {
        path: '/test',
        element: <Test />,
      },
      { path: '/test/:id', element: <Test /> },
      { path: '/api/tests/:id', element: <RedirectToTest /> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={appRouter} />;
};

export default App;