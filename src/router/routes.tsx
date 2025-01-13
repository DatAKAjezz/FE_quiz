import { createBrowserRouter, Outlet } from "react-router-dom";
import { Home } from "../pages/Home";
import { Error } from "../pages/Error";
import { Login } from "../pages/Authentication/Login";
import { Dashboard } from "../pages/Dashboard";
import PrivateRoute from "../pages/PrivateRoute";
import { Signup } from "../pages/Authentication/Signup";
import { Library } from "../pages/Library/Library";
import { Folders } from "../pages/Library/Folders";
import { Classes } from "../pages/Library/Classes";
import { Solutions } from "../pages/Library/Solutions";
import { FlashCard } from "../pages/QF/FlashCard";
import { LayoutWithHeader } from "../Layouts/LayoutWithHeader";


const routes = createBrowserRouter([
  {
    path: '/',
    element: <LayoutWithHeader />,
    errorElement: <Error />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/dashboard', element: <PrivateRoute children={<Dashboard />} /> },
      { path: '/library', element: <PrivateRoute children={<Library />} /> },
      {
        path: 'library/sets',
        element: <Library />,
        errorElement: <Error />
      },
      {
        path: 'library/folders',
        element: <Folders />,
        errorElement: <Error />
      },
      {
        path: 'library/classes',
        element: <Classes />,
        errorElement: <Error />
      },
      {
        path: 'library/solutions',
        element: <Solutions />,
        errorElement: <Error />
      }
    ]
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <Error />
  },
  {
    path: '/signup',
    element: <Signup />,
    errorElement: <Error />
  },
  {
    path: '/flashsets/:flashId/:type',
    element: <FlashCard />,
    errorElement: <Error />
  }

]);


export default routes