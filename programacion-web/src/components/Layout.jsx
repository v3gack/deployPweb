import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import RoleSelector from './RoleSelector';

const Layout = ({ userRole, setUserRole }) => {
  return (
    <div className="app-container">
      <Navbar userRole={userRole} />
      <RoleSelector userRole={userRole} setUserRole={setUserRole} />
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;