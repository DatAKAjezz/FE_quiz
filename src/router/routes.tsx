import { createBrowserRouter, Outlet } from "react-router-dom";
import Header from "../components/Header";
import { Home } from "../pages/Home";
import { Error } from "../pages/Error";
import { Login } from "../pages/Authentication/Login";
import { Dashboard } from "../pages/Dashboard";
import PrivateRoute from "../pages/PrivateRoute";
import { Signup } from "../pages/Authentication/Signup";
import { Library } from "../pages/Library/Library";

const LayoutWithHeader = () => {
  return (
    <div className="flex flex-col md:flex-row">
      <Header />
      <div className="pl-20 text-white w-full pt-20 bg-slate-800">
        <Outlet />
      </div>
    </div>
  );
};

const routes = createBrowserRouter([
  {
    path: '/',
    element: <LayoutWithHeader />,
    errorElement: <Error />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/dashboard', element: <PrivateRoute children={<Dashboard />} /> },
      { path: '/library', element: <PrivateRoute children={<Library />} /> }
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
]);


export default routes