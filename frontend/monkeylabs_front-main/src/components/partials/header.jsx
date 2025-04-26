import React from "react";

function Navbar() {
  // Replace this with your actual logic to check if the user is logged in
  // For example, you might check if a token is stored in localStorage
  const isLoggedIn = localStorage.getItem("userId") !== null;

  const handleLogout = () => {
    localStorage.removeItem("userId");
    console.log("Logged out");
    // Redirect to login or home page after logout
    window.location.href = "/";
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
      <a className="navbar-brand" href="/" style={{ padding: '5px' }}>  {/* Added padding here */}
    <img
        src="https://64.media.tumblr.com/097ef955a8b4293f55252738210dc182/64fddc8ce9749341-66/s400x600/bfdbebe4104527c0271b7144b9bdd098a2a32fdb.png"
        alt="Header Logo"
        height="40"  // Made the image half smaller
        className="d-inline-block align-top"
    />
</a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="/">
                Home
              </a>
            </li>
            {isLoggedIn && (
              <>
                <li className="nav-item">
                  <a className="nav-link" href="/profile">
                    Profile
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/orders">
                    Orders
                  </a>
                </li>
              </>
            )}
          </ul>
          {isLoggedIn && (
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={handleLogout}
              >
                Logout
              </button>
            </ul>
          )}
          {!isLoggedIn && (
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <a
                className="btn btn-outline-secondary"
                type="button"
                href="/login"
              >
                Login
              </a>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
