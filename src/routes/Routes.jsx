import React from 'react';
import { Routes, Route } from 'react-router-dom';
import mainRoutes from './routeList';

const AppRoutes = () => {
  return (
    <Routes>
      {mainRoutes.map((route, index) => (
        <Route key={index} path={route.path} element={route.component} />
      ))}
    </Routes>
  );
};

export default AppRoutes;
