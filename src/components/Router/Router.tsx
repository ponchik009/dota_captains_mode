import React from "react";
import { Route, Routes } from "react-router-dom";

import { Home } from "../../pages/Home/Home";
import { Play } from "../../pages/Play/Play";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/play/:id" element={<Play />} />
    </Routes>
  );
};
