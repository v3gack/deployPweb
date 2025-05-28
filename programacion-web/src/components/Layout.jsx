import React from 'react';
import Navbar from './Navbar';
import RoleSelector from './RoleSelector';

const Layout = ({ children, userRole, setUserRole }) => {
  return (
    <div className="app-container">
      <Navbar userRole={userRole} />
      <RoleSelector userRole={userRole} setUserRole={setUserRole} />
      <div className="main-content">
        {children}
      </div>
    </div>
  );
};

export default Layout;