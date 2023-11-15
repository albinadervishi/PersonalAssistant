import React from "react";

function Layout({ children }) {
  return (
    <div className="min-w-full min-h-screen  h-screen bg-white">
      <main>{children}</main>
    </div>
  );
}

export default Layout;
