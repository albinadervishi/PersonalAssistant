import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="navbar navbar-expand-lg navbar-dark bg-dark justify-content-center">
      <Link href="/home" className="text-decoration-none">
        <p className="navbar-brand mb-0 ml-5 h1">Wallet</p>
      </Link>

      <Link href="/to-do" className="text-decoration-none">
        <p className="navbar-brand mb-0 ml-5 h1">To-Do</p>
      </Link>

      <Link href="/weather" className="text-decoration-none">
        <p className="navbar-brand mb-0 ml-5 h1">Weather</p>
      </Link>
    </div>
  );
};

export default Navbar;
