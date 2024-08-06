import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Button } from "@chakra-ui/react";
import SidebarWithHeader from "./components/Sidebar";
import LoginPage from "./components/Login";
import { AuthProvider, useAuth } from "./providers/AuthProvider";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EngineQrCode from "./components/EngineQrCode";

const AppContent = () => {
  const { user } = useAuth();
  return (
    <div className="App">{user ? <SidebarWithHeader /> : <LoginPage />}</div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/*"
          element={
            <AuthProvider>
              <AppContent />
            </AuthProvider>
          }
        />
        <Route path="engine/:id/qrcode" element={<EngineQrCode />} />
      </Routes>
    </Router>
  );
};

export default App;
