import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./components/Layout";
import StackedCardLayout from "./components/StackedCardLayout";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/vdjkush" replace />} />

          <Route path="vdjkush" element={<StackedCardLayout />} />
          <Route path="mixes" element={<StackedCardLayout />} />
          <Route path="events" element={<StackedCardLayout />} />
          <Route path="services" element={<StackedCardLayout />} />
          <Route path="archive" element={<StackedCardLayout />} />
          <Route path="vibe" element={<StackedCardLayout />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
