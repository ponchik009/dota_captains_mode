import React from "react";
import { Route, Routes } from "react-router-dom";

import { Home } from "../../pages/Home/Home";
import { Play } from "../../pages/Play/Play";
import { Login } from "../../pages/Login/Login";
import { ProtectedRoute } from "../ProtectedRoute/ProtectedRoute";

export const Router = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/play/:id" element={<Play />} />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};
