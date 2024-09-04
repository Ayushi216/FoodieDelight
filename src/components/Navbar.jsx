import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img
            src="src/assets/foodie-logo.webp"
            alt="Logo"
            width="80"
            height="80"
            className="d-inline-block align-middle"
          />
         
        </Link>
        <div>
          <Link to="/add-new-restaurant">
            <button type="button" className="btn btn-secondary">
              Add New Restaurant
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
