import { createBrowserRouter, Outlet } from "react-router-dom";
import { Home } from "../pages/Home";
import { Error } from "../pages/Error";
import { Login } from "../pages/Authentication/Login";
import { Dashboard } from "../pages/Profiles/Dashboard";
import PrivateRoute from "../pages/PrivateRoute";
import { Signup } from "../pages/Authentication/Signup";
import { Library } from "../pages/Library/Library";
import { Folders } from "../pages/Library/Folders";
import { Classes } from "../pages/Library/Classes";
import { Solutions } from "../pages/Library/Solutions";
import { FlashCard } from "../pages/QF/FlashCard";
import { LayoutWithHeader } from "../Layouts/LayoutWithHeader";
import { FlashMenu } from "../pages/QF/FlashMenu";
import { Liked } from "../pages/Library/Liked";


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
      },
      {
        path: 'library/liked',
        element: <Liked/>,
        errorElement: <Error/>
      },
      {
        path: 'flashsets/:flashId/menu',
        element: <FlashMenu/>,
        errorElement: <Error/>
      }
    ]
  },
  {
    path: '/auth/login',
    element: <Login />,
    errorElement: <Error />
  },
  {
    path: '/auth/signup',
    element: <Signup />,
    errorElement: <Error />
  },
    {
      path: '/learn/flashcard/:flashId',
      element: <FlashCard />,
      errorElement: <Error />
    }

]);


export default routes