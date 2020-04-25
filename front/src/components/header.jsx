import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <div className="header">
    <h1 className="header-title">
      <Link to="/">photo gallery</Link>
    </h1>
    <h4 className="header-subtitle">only the epicest pictures</h4>
  </div>
);

export default Header;
