import React, { createContext, useState } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import "remixicon/fonts/remixicon.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";

export const server = "http://localhost:5000/api/v1";

export const Contextfirst = createContext();

const Appwrapper = () => {
  const [authentication, Setauthentication] = useState(false);
  const [user, Setuser] = useState("");

  return (
    <Contextfirst.Provider
      value={{ authentication, Setauthentication, user, Setuser }}
    >
      <App />
    </Contextfirst.Provider>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Appwrapper />
  </React.StrictMode>
);

