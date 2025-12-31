import React, { useState } from 'react';
import api from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('role', response.data.user.role);
      
      navigate('/');
      window.location.reload();
    } catch (error) {
      alert('Giriş başarısız! Bilgilerinizi kontrol edin.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow-lg border-0 rounded-4 p-4">
            <div className="card-body">
              <h2 className="text-center fw-bold mb-4">Giriş Yap</h2>
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label className="form-label text-secondary fw-semibold">E-posta</label>
                  <input 
                    type="email" 
                    className="form-control form-control-lg rounded-3" 
                    placeholder="ornek@mail.com"
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label text-secondary fw-semibold">Şifre</label>
                  <input 
                    type="password" 
                    className="form-control form-control-lg rounded-3" 
                    placeholder="••••••••"
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100 py-2 fw-bold rounded-3 shadow-sm">
                  Giriş Yap
                </button>
              </form>
              <div className="text-center mt-4">
                <small className="text-muted">
                  Henüz hesabınız yok mu? <a href="/register" className="text-decoration-none">Kayıt Ol</a>
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;