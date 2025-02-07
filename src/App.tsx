import { RouterProvider } from "react-router-dom";
import routes from "./router/routes";
import { AuthProvider } from "./context/AuthContext";
import { SnackbarProvider } from 'notistack'

const App = () => {

  return (
    <SnackbarProvider maxSnack={3}>
      <AuthProvider>
        <RouterProvider router={routes} />
      </AuthProvider>
    </SnackbarProvider>
  );
}

export default App;
