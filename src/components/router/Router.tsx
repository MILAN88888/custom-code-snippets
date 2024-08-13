import React from "react";
import { Routes, Route } from "react-router-dom";
import { Snippets, AddNew } from "./../../screen/index";

const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Snippets />} />
      <Route path="/snippet/add" element={<AddNew />} />
      <Route path="/snippet/edit/:id" element={<AddNew />} />
    </Routes>
  );
};

export default Router;
