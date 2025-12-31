import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axiosInstance';

const CourseContent = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourseDetail = async () => {
      try {
        
        const response = await api.get(`/courses/list`); 
        const foundCourse = response.data.find(c => c.id === parseInt(id));
        setCourse(foundCourse);
      } catch (error) {
        console.error("Kurs detayı yüklenemedi");
      }
    };
    fetchCourseDetail();
  }, [id]);

  if (!course) return <div className="container mt-5 text-center">Yükleniyor...</div>;

  return (
    <div className="container py-5">
      <button onClick={() => navigate(-1)} className="btn btn-outline-secondary mb-4">
        ← Geri Dön
      </button>
      
      <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
        <div className="bg-primary p-5 text-white text-center">
          <h1 className="display-4 fw-bold">{course.title}</h1>
          <p className="lead">{course.category?.name}</p>
        </div>
        
        <div className="card-body p-5">
          <h3 className="fw-bold mb-4">Kurs İçeriği</h3>
          <p className="text-secondary mb-5" style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
            {course.description}
          </p>
          
          <div className="alert alert-info rounded-3">
            <strong>Bilgi:</strong> Bu alan kursun videoları, dökümanları veya sınavları için ayrılmıştır.
          </div>
          
          <div className="mt-5">
            <h5 className="fw-bold">Mevcut Dersler:</h5>
            <ul className="list-group list-group-flush mt-3">
              <li className="list-group-item d-flex justify-content-between align-items-center">
                1. Giriş ve Temel Kavramlar <span className="badge bg-success rounded-pill">Tamamlandı</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                2. Uygulama Geliştirme <span className="badge bg-primary rounded-pill">Şu anki Ders</span>
              </li>
              <li className="list-group-item text-muted">
                3. Proje Teslimi (Yakında)
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseContent;