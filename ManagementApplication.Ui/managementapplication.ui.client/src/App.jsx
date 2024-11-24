import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Layout/AdminLayout";
import AdminComponents from "./Components/AdminComponents";
import UserListCompents from "./Components/UserListCompents";
 
const App = () => {
  return (
    <Router>
      <Routes> 
        <Route path="/" element={<Layout />}> 
        <Route index element={<Navigate to="AdminComponents" />} />
          <Route path="AdminComponents" element={<AdminComponents />} />
          <Route path="UserListCompents" element={<UserListCompents />} />
         </Route>
      </Routes>
    </Router>
  );
};

export default App;
