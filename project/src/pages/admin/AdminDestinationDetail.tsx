import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, MapPinIcon, CalendarIcon, TagIcon } from '@heroicons/react/24/outline';

interface DestinationDetail {
  id: number;
  name: string;
  location: string;
  category: string;
  urlPicture: string;
  description: string;
  createdDate: string;
  imageUrls: string[];
}

const AdminDestinationDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [destination, setDestination] = useState<DestinationDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDestination = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/Admin/destinations/${id}`);
        const data = await res.json();
        setDestination(data);
      } catch (error) {
        console.error("Lỗi khi load dữ liệu:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDestination();
  }, [id]);

  if (loading) return <div className="text-center py-16 text-gray-600">Đang tải...</div>;
  if (!destination) return <div className="text-center py-16 text-gray-600">Không tìm thấy địa điểm</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4">
        
        {/* Nút trở về */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeftIcon className="h-5 w-5" />
          <span>Quay lại</span>
        </button>

        {/* Tiêu đề */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{destination.name}</h1>
        
        <div className="flex items-center text-gray-600 mb-6 space-x-6">
          <div className="flex items-center">
            <MapPinIcon className="h-5 w-5 mr-1" />
            <span>{destination.location}</span>
          </div>
          <div className="flex items-center">
            <TagIcon className="h-5 w-5 mr-1" />
            <span>{destination.category}</span>
          </div>
          <div className="flex items-center">
            <CalendarIcon className="h-5 w-5 mr-1" />
            <span>{new Date(destination.createdDate).toLocaleDateString("vi-VN")}</span>
          </div>
        </div>

        {/* Ảnh chính */}
        <img 
          src={destination.urlPicture} 
          alt={destination.name} 
          className="w-full h-96 object-cover rounded-xl shadow-md mb-6"
        />

        {/* Mô tả */}
        <p className="text-gray-700 leading-relaxed whitespace-pre-line mb-8">
          {destination.description}
        </p>

        {/* Bộ sưu tập ảnh */}
        {destination.imageUrls && destination.imageUrls.length > 1 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Hình ảnh khác</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {destination.imageUrls.map((url, index) => (
                <img 
                  key={index} 
                  src={url} 
                  alt={`Ảnh ${index + 1}`} 
                  className="w-full h-48 object-cover rounded-lg shadow"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDestinationDetail;
