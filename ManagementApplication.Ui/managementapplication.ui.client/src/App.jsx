import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Layout/AdminLayout";
import AdminComponent from "./Components/AdminComponent";
import UserListCompent from "./Components/UserListCompent";
import CaseComponent from "./Components/CaseComponent";

 
const App = () => {
  return (
    <Router>
      <Routes> 
        <Route path="/" element={<Layout />}> 
        <Route index element={<Navigate to="AdminComponent" />} />
          <Route path="AdminComponent" element={<AdminComponent />} />
          <Route path="UserListCompent" element={<UserListCompent />} />
          <Route path="CaseComponent" element={<CaseComponent />} />

         </Route>
      </Routes>
    </Router>
  );
};

export default App;
