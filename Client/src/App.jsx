import { RouterProvider } from "react-router-dom";
import { AppContextProvider } from "./utils/AppContex";
import { Toaster } from "react-hot-toast";
import "./assets/prism.css";
import router from "./router/AppRoute";

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
