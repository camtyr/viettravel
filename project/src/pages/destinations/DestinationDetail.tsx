// src/pages/DestinationDetail.tsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData, Review } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';
import { 
  MapPinIcon, 
  StarIcon, 
  UserIcon,
  CalendarIcon,
  TagIcon,
  CheckBadgeIcon,
  ClockIcon,
  PencilIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';

const DestinationDetail: React.FC = () => {
  const {  username } = useAuth();
  const { id } = useParams<{ id: string }>();
  const { publicDestinations, getDestinationReviews, reviews, addReview } = useData();

  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [destinationReviews, setDestinationReviews] = useState<Review[]>([]);

  const destination = publicDestinations.find(d => d.id === Number(id));

  useEffect(() => {
    if (id) {
      getDestinationReviews(Number(id)).then(() => {
        setDestinationReviews(reviews.filter(r => r.destinationId === Number(id)));
      });
    }
  }, [id, reviews]);

  if (!destination) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <MapPinIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Không tìm thấy địa điểm</h2>
          <p className="text-gray-600 mb-6">Địa điểm bạn tìm kiếm không tồn tại hoặc đã bị xóa</p>
          <Link
            to="/destinations"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Quay lại danh sách
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username) return;

    setIsSubmitting(true);
    await addReview(destination.id, newReview.rating, newReview.comment.trim());
    setNewReview({ rating: 5, comment: '' });
    setIsSubmitting(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'text-green-600 bg-green-100';
      case 'Pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'Rejected':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'Đã duyệt';
      case 'Pending':
        return 'Chờ duyệt';
      case 'Rejected':
        return 'Bị từ chối';
      default:
        return 'Không xác định';
    }
  };

  const categories = {
    nature: 'Thiên nhiên',
    cultural: 'Văn hóa',
    historical: 'Lịch sử',
    beach: 'Biển',
    mountain: 'Núi',
    city: 'Thành phố',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-4">
              <li>
                <Link to="/" className="text-gray-500 hover:text-gray-700">
                  Trang chủ
                </Link>
              </li>
              <li className="flex items-center">
                <svg className="flex-shrink-0 h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                <Link to="/destinations" className="ml-4 text-gray-500 hover:text-gray-700">
                  Địa điểm
                </Link>
              </li>
              <li className="flex items-center">
                <svg className="flex-shrink-0 h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                <span className="ml-4 text-gray-900 font-medium">{destination.name}</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Hero Image */}
            <div className="relative h-96 rounded-xl overflow-hidden mb-8">
              <img
                src={destination.urlPicture}
                alt={destination.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg?auto=compress&cs=tinysrgb&w=800';
                }}
              />
              <div className="absolute top-4 right-4">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(destination.status)}`}>
                  {destination.status === 'Approved' && <CheckBadgeIcon className="h-4 w-4 mr-1" />}
                  {destination.status === 'Pending' && <ClockIcon className="h-4 w-4 mr-1" />}
                  {getStatusText(destination.status)}
                </span>
              </div>
            </div>

            {/* Destination Info */}
            <div className="bg-white rounded-xl shadow-md p-8 mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{destination.name}</h1>
              <div className="flex flex-wrap items-center gap-6 mb-6">
                <div className="flex items-center space-x-1">
                  <MapPinIcon className="h-5 w-5 text-gray-500" />
                  <span className="text-gray-700">{destination.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <StarIcon className="h-5 w-5 text-yellow-500" />
                  <span className="font-medium">{destination.rating > 0 ? destination.rating.toFixed(1) : 'Chưa có đánh giá'}</span>
                  <span className="text-gray-500">({destination.ratingCount} đánh giá)</span>
                </div>
                <div className="flex items-center space-x-1">
                  <TagIcon className="h-5 w-5 text-gray-500" />
                  <span className="text-gray-700">{categories[destination.category as keyof typeof categories] || 'Khác'}</span>
                </div>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">{destination.description}</p>
              <div className="flex items-center text-sm text-gray-500">
                <CalendarIcon className="h-4 w-4 mr-1" />
                <span>Được thêm vào {formatDate(destination.createdDate)}</span>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Đánh giá ({destinationReviews.length})</h2>

              {/* Add Review Form */}
              {username && destination.status === 'Approved' && (
                <div className="mb-8 p-6 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Viết đánh giá của bạn</h3>
                  <form onSubmit={handleSubmitReview}>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Đánh giá</label>
                      <div className="flex items-center space-x-1">
                        {[1,2,3,4,5].map(star => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setNewReview({ ...newReview, rating: star })}
                            className="text-2xl focus:outline-none"
                          >
                            {star <= newReview.rating ? <StarSolidIcon className="h-8 w-8 text-yellow-500" /> : <StarIcon className="h-8 w-8 text-gray-300" />}
                          </button>
                        ))}
                        <span className="ml-2 text-sm text-gray-600">{newReview.rating}/5 sao</span>
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Bình luận</label>
                      <textarea
                        value={newReview.comment}
                        onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Chia sẻ trải nghiệm của bạn về địa điểm này..."
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting || !newReview.comment.trim()}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          <span>Đang gửi...</span>
                        </>
                      ) : (
                        <>
                          <PencilIcon className="h-4 w-4" />
                          <span>Gửi đánh giá</span>
                        </>
                      )}
                    </button>
                  </form>
                </div>
              )}

              {!username && destination.status === 'Approved' && (
                <div className="mb-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-blue-800">
                    <Link to="/login" className="font-medium hover:underline">Đăng nhập</Link> để viết đánh giá
                  </p>
                </div>
              )}

              {/* Reviews List */}
              {destinationReviews.length > 0 ? (
                <div className="space-y-6">
                  {destinationReviews
                    .sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                    .map(review => (
                      <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                        <div className="flex items-start space-x-4">
                          <div className="bg-blue-100 p-2 rounded-full">
                            <UserIcon className="h-6 w-6 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold text-gray-900">{review.username}</h4>
                              <span className="text-sm text-gray-500">{formatDate(review.createdAt)}</span>
                            </div>
                            <div className="flex items-center mb-2">
                              {[1,2,3,4,5].map(star => (
                                <StarSolidIcon key={star} className={`h-4 w-4 ${star <= review.rating ? 'text-yellow-500' : 'text-gray-300'}`} />
                              ))}
                              <span className="ml-2 text-sm text-gray-600">{review.rating}/5</span>
                            </div>
                            <p className="text-gray-700">{review.comment}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  }
                </div>
              ) : (
                <div className="text-center py-8">
                  <StarIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Chưa có đánh giá nào cho địa điểm này</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Thao tác nhanh</h3>
                <div className="space-y-3">
                  <Link to="/destinations" className="block w-full text-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">Quay lại danh sách</Link>
                  <Link to="/create-destination" className="block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">Thêm địa điểm khác</Link>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Thông tin thêm</h3>
                <dl className="space-y-3">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Danh mục</dt>
                    <dd className="text-sm text-gray-900">{categories[destination.category as keyof typeof categories] || 'Khác'}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Trạng thái</dt>
                    <dd>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(destination.status)}`}>{getStatusText(destination.status)}</span>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Ngày tạo</dt>
                    <dd className="text-sm text-gray-900">{formatDate(destination.createdDate)}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Số lượt đánh giá</dt>
                    <dd className="text-sm text-gray-900">{destination.ratingCount} đánh giá</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetail;
