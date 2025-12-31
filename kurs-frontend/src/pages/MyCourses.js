import React, { useState, useEffect } from 'react';
import api from '../api/axiosInstance';
import { Link, useNavigate } from 'react-router-dom'; 

const MyCourses = () => {
  const [myEnrollments, setMyEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 

  useEffect(() => {
    fetchMyCourses();
  }, []);

  const fetchMyCourses = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.id) {
      setLoading(false);
      return;
    }

    try {
      const response = await api.get(`/enrollments/my-courses/${user.id}`);
      setMyEnrollments(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Kurslarım yüklenemedi:", error);
      setLoading(false);
    }
  };

  const handleUnenroll = async (courseId) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!window.confirm("Bu kursun kaydını silmek istediğinize emin misiniz?")) return;

    try {
      await api.delete(`/enrollments/leave/${user.id}/${courseId}`);
      alert("Kaydınız başarıyla silindi.");
      fetchMyCourses(); 
    } catch (error) {
      alert("Kayıt silinirken bir hata oluştu.");
    }
  };

  if (loading) return (
    <div className="d-flex justify-content-center mt-5">
      <div className="spinner-border text-primary" role="status"></div>
    </div>
  );

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-5">
        <div>
          <h1 className="fw-bold text-dark mb-1">Eğitimlerim</h1>
          <p className="text-muted">Kayıt olduğunuz ve devam ettiğiniz kurslar.</p>
        </div>
        <Link to="/" className="btn btn-outline-primary rounded-pill px-4 fw-bold">
          + Yeni Kurs Ekle
        </Link>
      </div>

      {myEnrollments.length === 0 ? (
        <div className="card border-0 shadow-sm rounded-4 text-center p-5 bg-light">
          <div className="display-1 mb-3">🎓</div>
          <h3 className="fw-bold">Henüz bir kursa kayıtlı değilsiniz</h3>
          <p className="text-muted mb-4">Öğrenmeye başlamak için katalogdan size uygun bir kurs seçin.</p>
          <Link to="/" className="btn btn-primary btn-lg rounded-pill px-5 shadow">
            Kursları Keşfet
          </Link>
        </div>
      ) : (
        <div className="row g-4">
          {myEnrollments.map((enrollment) => (
            <div key={enrollment.id} className="col-md-6 col-lg-4">
              <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden">
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill px-3">
                      {enrollment.course?.category?.name || 'Genel'}
                    </span>
                    <small className="text-success fw-bold">● Aktif</small>
                  </div>
                  <h4 className="card-title fw-bold mb-3">{enrollment.course?.title}</h4>
                  <p className="card-text text-secondary small mb-4">
                    {enrollment.course?.description || "Kurs içeriği yükleniyor..."}
                  </p>
                  
                  <div className="d-flex gap-2 border-top pt-4">
                    
                    <button 
                      className="btn btn-primary flex-grow-1 fw-bold rounded-3"
                      onClick={() => navigate(`/course-content/${enrollment.course.id}`)}
                    >
                      Kursa Git
                    </button>
                    <button 
                      onClick={() => handleUnenroll(enrollment.course.id)}
                      className="btn btn-outline-danger fw-bold rounded-3"
                      title="Kaydı İptal Et"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCourses;