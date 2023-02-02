import { Snackbar } from "@mui/material";
import React, { createContext, useState } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

export const GlobalContext = createContext();

const App = () => {
  const [snackbarParams, setSnackbarParams] = useState({
    isOpen: false,
    message: "",
  });

  return (
    <GlobalContext.Provider value={{ snackbarParams, setSnackbarParams }}>
      <RouterProvider router={router} />

      <Snackbar
        open={snackbarParams.isOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarParams({ isOpen: false, message: "" })}
        message={snackbarParams.message}
      />
    </GlobalContext.Provider>
  );
};

export default App;
