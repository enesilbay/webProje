import React, { useState, useEffect } from 'react';
import api from '../api/axiosInstance';

const StudentCoursePage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });

  
  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await api.get('/courses/list');
      setCourses(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Kurslar yüklenirken hata oluştu:", error);
      setLoading(false);
    }
  };

  
  const handleEnroll = async (courseId) => {
    try {
      
      await api.post('/enrollments/enroll', { courseId });
      setMessage({ type: 'success', text: 'Kursa başarıyla kayıt oldunuz!' });
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Kayıt sırasında bir hata oluştu.';
      setMessage({ type: 'error', text: errorMsg });
    }
  };

  if (loading) return <div className="p-10">Kurslar yükleniyor...</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Mevcut Kurslar</h1>

      
      {message.text && (
        <div className={`p-4 mb-4 rounded ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message.text}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-white rounded-lg shadow-md p-5 border border-gray-200">
            <h2 className="text-xl font-semibold text-blue-600">{course.title}</h2>
            
            
            <span className="inline-block bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded mt-2">
              Kategori: {course.category?.name || 'Genel'}
            </span>

            <p className="text-gray-600 mt-3 h-20 overflow-hidden">
              {course.description || 'Bu kurs için bir açıklama bulunmamaktadır.'}
            </p>

            <button
              onClick={() => handleEnroll(course.id)}
              className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              Kursa Kayıt Ol
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentCoursePage;