import React, { useState } from 'react';
import api from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'student' 
  });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', formData);
      alert('Kayıt başarılı! Şimdi giriş yapabilirsiniz.');
      navigate('/login');
    } catch (error) {
      alert('Kayıt sırasında bir hata oluştu.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow-lg border-0 rounded-4 p-4">
            <div className="card-body">
              <div className="text-center mb-4">
                <h2 className="fw-bold mb-1">Aramıza Katıl</h2>
                <p className="text-muted small">Yeni bir hesap oluşturun ve öğrenmeye başlayın.</p>
              </div>
              <form onSubmit={handleRegister}>
                <div className="mb-3">
                  <label className="form-label text-secondary fw-semibold">Kullanıcı Adı</label>
                  <input 
                    type="text" 
                    className="form-control rounded-3" 
                    placeholder="enes_123"
                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                    required 
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label text-secondary fw-semibold">E-posta</label>
                  <input 
                    type="email" 
                    className="form-control rounded-3" 
                    placeholder="ornek@mail.com"
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required 
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label text-secondary fw-semibold">Şifre</label>
                  <input 
                    type="password" 
                    className="form-control rounded-3" 
                    placeholder="••••••••"
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    required 
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100 py-2 fw-bold rounded-3 shadow-sm">
                  Kayıt Ol
                </button>
              </form>
              <div className="text-center mt-4">
                <small className="text-muted">
                  Zaten hesabınız var mı? <a href="/login" className="text-decoration-none fw-bold">Giriş Yap</a>
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;