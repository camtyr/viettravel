import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, MapPinIcon, CalendarIcon, TagIcon, StarIcon, UserIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';

interface Review {
  id: number;
  username: string;
  rating: number;
  comment: string;
  createdAt: string;
}

interface DestinationDetail {
  id: number;
  name: string;
  location: string;
  category: string;
  urlPicture: string;
  description: string;
  createdDate: string;
  imageUrls: string[];
  status: string;
}

const AdminDestinationDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [destination, setDestination] = useState<DestinationDetail | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
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

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/api/Reviews/destination/${id}`)
        .then(res => res.json())
        .then(data => setReviews(data))
        .catch(err => console.error("Lỗi khi load reviews:", err));
    }
  }, [id]);

  if (loading) return <div className="text-center py-16 text-gray-600">Đang tải...</div>;
  if (!destination) return <div className="text-center py-16 text-gray-600">Không tìm thấy địa điểm</div>;

  const averageRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : null;

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
          {destination.status?.toLowerCase() === "approved" && (
            <div className="flex items-center">
              <StarIcon className="h-5 w-5 text-yellow-500 mr-1" />
              <span>
                {averageRating ? `${averageRating}/5 (${reviews.length} đánh giá)` : "Chưa có đánh giá"}
              </span>
            </div>
          )}
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

        {/* Reviews Section - chỉ hiển thị nếu đã duyệt */}
        {destination.status?.toLowerCase() === "approved" && (
          <div className="bg-white rounded-xl shadow-md p-8 mt-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Đánh giá ({reviews.length})
            </h2>
            {reviews.length > 0 ? (
              <div className="space-y-6">
                {reviews
                  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                  .map((review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                      <div className="flex items-start space-x-4">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <UserIcon className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-gray-900">{review.username}</h4>
                            <span className="text-sm text-gray-500">
                              {new Date(review.createdAt).toLocaleDateString("vi-VN")}
                            </span>
                          </div>
                          <div className="flex items-center mb-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <StarSolidIcon
                                key={star}
                                className={`h-4 w-4 ${star <= review.rating ? "text-yellow-500" : "text-gray-300"}`}
                              />
                            ))}
                            <span className="ml-2 text-sm text-gray-600">{review.rating}/5</span>
                          </div>
                          <p className="text-gray-700">{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <StarIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Chưa có đánh giá nào cho địa điểm này</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDestinationDetail;
