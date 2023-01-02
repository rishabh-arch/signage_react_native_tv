import React from "react";

import { AuthProvider } from "./src/components/context/AuthContext.js";
import Routers from "./src/screens/Routers";


export default function App() {
  
  return (
    <AuthProvider>
      <Routers />
    </AuthProvider>
  );
}
