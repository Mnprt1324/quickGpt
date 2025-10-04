import { RouterProvider, useLocation } from "react-router-dom";
import router from "./router/appRoute";
import { AppContextProvider } from "./utils/AppContex";
import { Toaster } from "react-hot-toast";
import "./assets/prism.css";

const App = () => {
  return (
    <>
      <AppContextProvider>
        <Toaster position="top-right" reverseOrder={false} />
        <RouterProvider router={router} />
      </AppContextProvider>
    </>
  );
};
export default App;
