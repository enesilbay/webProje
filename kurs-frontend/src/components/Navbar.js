import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
    window.location.reload();
  };

  return (
    
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow mb-4">
      <div className="container">
        
        <Link className="navbar-brand fw-bold fs-2" to="/">
          <span className="text-white tracking-wider">KURS</span>
        </Link>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active fw-medium" to="/">Katalog</Link>
            </li>
            {user && (
              <li className="nav-item">
                <Link className="nav-link fw-medium" to="/my-courses">Kurslarım</Link>
              </li>
            )}
          </ul>

          <div className="d-flex align-items-center gap-3">
            {user?.role === 'admin' && (
              <Link to="/admin-panel" className="btn btn-outline-warning btn-sm fw-bold">
                Yönetim Paneli
              </Link>
            )}

            {user ? (
              <div className="d-flex align-items-center gap-3">
                <span className="text-secondary d-none d-md-inline small">{user.email}</span>
                <button onClick={handleLogout} className="btn btn-outline-danger btn-sm fw-bold px-4">
                  Çıkış
                </button>
              </div>
            ) : (
              <Link to="/login" className="btn btn-warning text-dark fw-bold px-4">Giriş Yap</Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;