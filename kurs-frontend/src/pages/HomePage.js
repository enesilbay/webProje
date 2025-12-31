import React, { useState, useEffect } from 'react';
import api from '../api/axiosInstance';

const HomePage = () => {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      const [courseRes, catRes] = await Promise.all([
        api.get('/courses/list'),
        api.get('/categories/list')
      ]);
      setCourses(courseRes.data);
      setCategories(catRes.data);
      setLoading(false);
    } catch (error) {
      console.error("Veriler yüklenemedi", error);
      setLoading(false);
    }
  };

  const handleEnroll = async (courseId) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      alert("Lütfen önce giriş yapın!");
      return;
    }

    try {
      await api.post('/enrollments/enroll', { userId: user.id, courseId });
      alert("Kursa başarıyla kayıt oldunuz!");
    } catch (error) {
      alert(error.response?.data?.message || "Kayıt hatası.");
    }
  };

  const getCategoryStyles = (categoryName) => {
    switch (categoryName) {
      case 'Yazılım':
      case 'Web Geliştirme':
        return { 
          gradient: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)', 
          shadow: 'rgba(99, 102, 241, 0.2)',
          icon: '💻' 
        };
      case 'Veri Bilimi':
      case 'Yapay Zeka':
        return { 
          gradient: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)', 
          shadow: 'rgba(16, 185, 129, 0.2)',
          icon: '📊' 
        };
      case 'Tasarım':
        return { 
          gradient: 'linear-gradient(135deg, #f43f5e 0%, #fb923c 100%)', 
          shadow: 'rgba(244, 63, 94, 0.2)',
          icon: '🎨' 
        };
      case 'Excel':
      case 'Finans':
        return { 
          gradient: 'linear-gradient(135deg, #0ea5e9 0%, #22d3ee 100%)', 
          shadow: 'rgba(14, 165, 233, 0.2)',
          icon: '📈' 
        };
      case 'İngilizce':
        return { 
          gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', 
          shadow: 'rgba(245, 158, 11, 0.2)',
          icon: '🌍' 
        };
      case 'Pazarlama':
        return { 
          gradient: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)', 
          shadow: 'rgba(139, 92, 246, 0.2)',
          icon: '📢' 
        };
      default:
        return { 
          gradient: 'linear-gradient(135deg, #475569 0%, #1e293b 100%)', 
          shadow: 'rgba(71, 85, 105, 0.2)',
          icon: '📚' 
        };
    }
  };

  const filteredCourses = courses.filter(course => {
    const matchesCategory = selectedCategory === 'all' || course.category?.id === parseInt(selectedCategory);
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          course.description?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) return (
    <div className="d-flex justify-content-center align-items-center" style={{height: '60vh'}}>
      <div className="spinner-grow text-primary" role="status"></div>
    </div>
  );

  return (
    <div className="container-fluid px-5 py-5">
      
      <div className="text-center mb-5">
        <h1 className="display-5 fw-bold text-dark mb-3">Eğitim Kataloğu</h1>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="input-group input-group-lg shadow-sm rounded-pill overflow-hidden border">
              <span className="input-group-text bg-white border-0 ps-4">🔍</span>
              <input 
                type="text" 
                className="form-control border-0 shadow-none ps-2"
                placeholder="Öğrenmek istediğiniz konuyu arayın..."
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-center flex-wrap gap-2 mt-4">
          <button 
            onClick={() => setSelectedCategory('all')}
            className={`btn rounded-pill px-4 fw-bold transition ${selectedCategory === 'all' ? 'btn-dark shadow' : 'btn-light border'}`}
          >
            Tümü
          </button>
          {categories.map(cat => (
            <button 
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id.toString())}
              className={`btn rounded-pill px-4 fw-bold transition ${selectedCategory === cat.id.toString() ? 'btn-dark shadow' : 'btn-light border'}`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      
      <div className="row g-4">
        {filteredCourses.map((course) => {
          const styles = getCategoryStyles(course.category?.name);

          return (
            <div key={course.id} className="col-sm-6 col-md-4 col-lg-3">
              <div 
                className="card h-100 border-0 course-card-hover"
                style={{
                  borderRadius: '16px',
                  boxShadow: `0 10px 25px ${styles.shadow}`,
                  transition: 'transform 0.3s ease'
                }}
              >
                <div 
                  className="card-header border-0 d-flex align-items-center justify-content-center"
                  style={{ 
                    background: styles.gradient,
                    height: '110px',
                    fontSize: '2.5rem',
                    borderRadius: '16px 16px 0 0'
                  }}
                >
                  {styles.icon}
                </div>
                
                <div className="card-body p-3">
                  <div className="mb-2">
                    <span 
                      className="badge rounded-pill fw-bold"
                      style={{
                        backgroundColor: `${styles.shadow.replace('0.2', '0.1')}`,
                        color: styles.shadow.replace('0.2', '1'),
                        fontSize: '0.7rem'
                      }}
                    >
                      {course.category?.name || 'Genel'}
                    </span>
                  </div>
                  <h6 className="fw-bold text-dark mb-2" style={{height: '40px', overflow: 'hidden'}}>
                    {course.title}
                  </h6>
                  <p className="text-secondary mb-0" style={{fontSize: '0.8rem', height: '35px', overflow: 'hidden'}}>
                    {course.description || "Açıklama bulunmuyor."}
                  </p>
                </div>
                
                <div className="card-footer bg-white border-0 p-3 pt-0">
                  <button
                    onClick={() => handleEnroll(course.id)}
                    className="btn btn-sm w-100 py-2 fw-bold text-white rounded-3 border-0 shadow-sm"
                    style={{ background: styles.gradient }}
                  >
                    Kaydol
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-5">
          <h4 className="text-muted">Sonuç bulunamadı.</h4>
        </div>
      )}
    </div>
  );
};

export default HomePage;