import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = ({ userRole, setUserRole }) => {
  return (
    <div className="app-container">
      <Navbar userRole={userRole} />
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;