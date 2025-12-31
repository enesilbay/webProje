import React, { useState, useEffect } from 'react';
import api from '../api/axiosInstance';

const AdminCoursePage = () => {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({ title: '', description: '', categoryId: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [courseRes, catRes] = await Promise.all([
        api.get('/courses/list'), 
        api.get('/categories/list')
      ]);
      setCourses(courseRes.data);
      setCategories(catRes.data);
    } catch (error) {
      console.error("Veri çekme hatası:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        
        await api.patch(`/courses/${editingId}`, formData); 
        alert("Kurs başarıyla güncellendi!");
      } else {
        
        await api.post('/courses/add', formData); 
        alert("Yeni kurs başarıyla eklendi!");
      }
      setFormData({ title: '', description: '', categoryId: '' });
      setEditingId(null);
      fetchData();
    } catch (error) {
      console.error("İşlem hatası:", error.response?.data);
      alert("Hata: " + (error.response?.data?.message || "İşlem başarısız."));
    }
  };

  const handleEdit = (course) => {
    setEditingId(course.id);
    setFormData({
      title: course.title,
      description: course.description,
      categoryId: course.category?.id || ''
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bu kursu silmek istediğinize emin misiniz?")) return;
    try {
      
      await api.delete(`/courses/${id}`); 
      alert("Kurs silindi.");
      fetchData();
    } catch (error) {
      console.error("Silme hatası:", error.response?.data);
      alert("Hata: " + (error.response?.data?.message || "Silme işlemi başarısız. Bu kursa kayıtlı öğrenciler olabilir."));
    }
  };

  return (
    <div className="container py-5">
      <div className="row mb-5 text-center">
        <div className="col-12">
          <h1 className="fw-bold text-primary">Yönetim Paneli</h1>
          <p className="text-muted">Kurs ekleme, düzenleme ve silme işlemlerini buradan yönetebilirsiniz.</p>
        </div>
      </div>

      <div className="row g-4">
        
        <div className="col-lg-4">
          <div className="card shadow-sm border-0 rounded-4 sticky-top" style={{ top: '90px' }}>
            <div className="card-body p-4">
              <h4 className="fw-bold mb-4 text-dark">
                {editingId ? '🚀 Kursu Güncelle' : '✨ Yeni Kurs Ekle'}
              </h4>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label small fw-bold text-secondary">Kurs Başlığı</label>
                  <input 
                    type="text" 
                    className="form-control rounded-3 border-light-subtle" 
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="Örn: React ile Web Geliştirme"
                    required 
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label small fw-bold text-secondary">Kategori</label>
                  <select 
                    className="form-select rounded-3 border-light-subtle"
                    value={formData.categoryId}
                    onChange={(e) => setFormData({...formData, categoryId: e.target.value})}
                    required
                  >
                    <option value="">Kategori Seçin...</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="form-label small fw-bold text-secondary">Kurs Açıklaması</label>
                  <textarea 
                    className="form-control rounded-3 border-light-subtle" 
                    rows="4"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Kurs içeriği hakkında kısa bilgi..."
                  ></textarea>
                </div>
                <div className="d-grid gap-2">
                  <button type="submit" className={`btn py-2 fw-bold shadow-sm ${editingId ? 'btn-success' : 'btn-primary'}`}>
                    {editingId ? 'Değişiklikleri Uygula' : 'Kursu Yayınla'}
                  </button>
                  {editingId && (
                    <button 
                      type="button" 
                      className="btn btn-light text-secondary fw-bold"
                      onClick={() => { setEditingId(null); setFormData({ title: '', description: '', categoryId: '' }); }}
                    >
                      Vazgeç
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>

        
        <div className="col-lg-8">
          <div className="card shadow-sm border-0 rounded-4 overflow-hidden">
            <div className="card-header bg-white p-4 border-0 d-flex justify-content-between align-items-center">
              <h4 className="fw-bold mb-0 text-dark">Mevcut Kurslar</h4>
              <span className="badge bg-primary rounded-pill px-3 py-2">{courses.length} Kurs</span>
            </div>
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light text-secondary small text-uppercase">
                  <tr>
                    <th className="px-4">Kurs Detayı</th>
                    <th>Kategori</th>
                    <th className="text-end px-4">Yönet</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course) => (
                    <tr key={course.id}>
                      <td className="px-4 py-3">
                        <div className="fw-bold text-dark">{course.title}</div>
                        <div className="text-muted small text-truncate" style={{ maxWidth: '280px' }}>
                          {course.description}
                        </div>
                      </td>
                      <td>
                        <span className="badge bg-info-subtle text-info border border-info-subtle rounded-pill px-3">
                          {course.category?.name || 'Genel'}
                        </span>
                      </td>
                      <td className="text-end px-4">
                        <div className="btn-group shadow-sm rounded-3 overflow-hidden">
                          <button 
                            onClick={() => handleEdit(course)}
                            className="btn btn-white btn-sm px-3 border-end"
                            title="Düzenle"
                          >
                            ✏️
                          </button>
                          <button 
                            onClick={() => handleDelete(course.id)}
                            className="btn btn-white btn-sm px-3 text-danger"
                            title="Sil"
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {courses.length === 0 && (
                    <tr>
                      <td colSpan="3" className="text-center py-5 text-muted">
                        Henüz hiç kurs eklenmedi. Sol taraftaki formu kullanarak ilk kursunuzu oluşturun.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCoursePage;