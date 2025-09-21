// src/pages/DestinationDetail.tsx  (hoặc đường dẫn file hiện tại của bạn)
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
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

const placeholderLarge = 'https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg?auto=compress&cs=tinysrgb&w=800';
const placeholderThumb = 'https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg?auto=compress&cs=tinysrgb&w=400';

const DestinationDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { publicDestinations, reviews, addReview, getDestinationReviews } = useData();
  const { id: userId } = useAuth();
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const destinationId = Number(id);
  const destination = publicDestinations.find(d => d.id === destinationId);

  // mainImage state: ảnh chính hiển thị
  const [mainImage, setMainImage] = useState<string>(placeholderLarge);

  useEffect(() => {
    if (destinationId) {
      getDestinationReviews(destinationId);
    }
  }, [destinationId]);

  // khi destination thay đổi (khi data từ context load xong), set mainImage mặc định
  useEffect(() => {
    if (destination) {
      // nếu urlPicture là mảng và có ít nhất 1 ảnh -> set ảnh đầu
      if (Array.isArray(destination.urlPicture) && destination.urlPicture.length > 0) {
        setMainImage(destination.urlPicture[0]);
      } else if (typeof destination.urlPicture === 'string' && (destination.urlPicture as string).length > 0) {
        // phòng trường hợp urlPicture lưu chuỗi (như single url)
        setMainImage(destination.urlPicture as string);
      } else {
        setMainImage(placeholderLarge);
      }
    }
  }, [destination]);

  const destinationReviews = reviews.filter(r => r.destinationId === destinationId);

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
    if (!userId) return;

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
    switch (status?.toLowerCase()) {
      case 'approved':
      case 'đã duyệt':
        return 'text-green-600 bg-green-100';
      case 'pending':
      case 'chờ duyệt':
        return 'text-yellow-600 bg-yellow-100';
      case 'rejected':
      case 'bị từ chối':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    if (!status) return 'Không xác định';
    switch (status?.toLowerCase()) {
      case 'approved': return 'Đã duyệt';
      case 'pending': return 'Chờ duyệt';
      case 'rejected': return 'Bị từ chối';
      default: return status;
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

  // compute index hiển thị (1-based)
  const currentIndex = Array.isArray(destination.urlPicture)
    ? Math.max(1, destination.urlPicture.findIndex(img => img === mainImage) + 1)
    : 1;

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
            {/* Image Gallery */}
            <div className="mb-8">
              <div className="space-y-4">
                {/* Main Image (dùng mainImage state) */}
                <div className="relative h-96 rounded-xl overflow-hidden">
                  <img
                    src={mainImage || placeholderLarge}
                    alt={destination.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = placeholderLarge;
                    }}
                  />
                  <div className="absolute top-4 right-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(destination.status)}`}>
                      {destination.status === 'Approved' && <CheckBadgeIcon className="h-4 w-4 mr-1" />}
                      {destination.status === 'Pending' && <ClockIcon className="h-4 w-4 mr-1" />}
                      {getStatusText(destination.status)}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-lg text-sm">
                    {currentIndex} / {(Array.isArray(destination.urlPicture) ? destination.urlPicture.length : 1)}
                  </div>
                </div>
                
                {/* Thumbnail Gallery (show all thumbnails, click đổi mainImage) */}
                <div className="grid grid-cols-4 gap-3">
                  {(Array.isArray(destination.urlPicture) && destination.urlPicture.length > 0 ? destination.urlPicture : [placeholderThumb]).map((urlPicture, index) => (
                    <div
                      key={index}
                      className={`relative h-24 rounded-lg overflow-hidden cursor-pointer border-2 
                        ${mainImage === urlPicture ? 'border-blue-500' : 'border-transparent'}`}
                      onClick={() => setMainImage(urlPicture)}
                    >
                      <img
                        src={urlPicture || placeholderThumb}
                        alt={`${destination.name} ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = placeholderThumb;
                        }}
                      />
                      {index === 3 && Array.isArray(destination.urlPicture) && destination.urlPicture.length > 4 && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                          <span className="text-white font-medium">+{destination.urlPicture.length - 4}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
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
                  <span className="font-medium">
                    {destination.rating > 0 ? destination.rating.toFixed(1) : 'Chưa có đánh giá'}
                  </span>
                  <span className="text-gray-500">({destination.ratingCount} đánh giá)</span>
                </div>

                <div className="flex items-center space-x-1">
                  <TagIcon className="h-5 w-5 text-gray-500" />
                  <span className="text-gray-700">
                    {categories[destination.category as keyof typeof categories] || 'Khác'}
                  </span>
                </div>
              </div>

              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                {destination.description}
              </p>

              <div className="flex items-center text-sm text-gray-500">
                <CalendarIcon className="h-4 w-4 mr-1" />
                <span>Được thêm vào {formatDate(destination.createdDate)}</span>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Đánh giá ({destinationReviews.length})
              </h2>

              {/* Add Review Form */}
              {userId && (destination.status?.toLowerCase() === 'approved' || destination.status === 'Approved') && (
                <div className="mb-8 p-6 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Viết đánh giá của bạn</h3>
                  <form onSubmit={handleSubmitReview}>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Đánh giá
                      </label>
                      <div className="flex items-center space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setNewReview({ ...newReview, rating: star })}
                            className="text-2xl focus:outline-none"
                          >
                            {star <= newReview.rating ? (
                              <StarSolidIcon className="h-8 w-8 text-yellow-500" />
                            ) : (
                              <StarIcon className="h-8 w-8 text-gray-300" />
                            )}
                          </button>
                        ))}
                        <span className="ml-2 text-sm text-gray-600">
                          {newReview.rating}/5 sao
                        </span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bình luận
                      </label>
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

              {!userId && (destination.status?.toLowerCase() === 'approved' || destination.status === 'Approved') && (
                <div className="mb-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-blue-800">
                    <Link to="/login" className="font-medium hover:underline">
                      Đăng nhập
                    </Link>{' '}
                    để viết đánh giá cho địa điểm này
                  </p>
                </div>
              )}

              {/* Reviews List */}
              {destinationReviews.length > 0 ? (
                <div className="space-y-6">
                  {destinationReviews
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
                              {formatDate(review.createdAt)}
                            </span>
                          </div>
                          <div className="flex items-center mb-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <StarSolidIcon
                                key={star}
                                className={`h-4 w-4 ${
                                  star <= review.rating ? 'text-yellow-500' : 'text-gray-300'
                                }`}
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
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Thao tác nhanh</h3>
                <div className="space-y-3">
                  <Link
                    to="/destinations"
                    className="block w-full text-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Quay lại danh sách
                  </Link>
                  <Link
                    to="/create-destination"
                    className="block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Thêm địa điểm khác
                  </Link>
                </div>
              </div>

              {/* Related Info */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Thông tin thêm</h3>
                <dl className="space-y-3">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Danh mục</dt>
                    <dd className="text-sm text-gray-900">
                      {categories[destination.category as keyof typeof categories] || 'Khác'}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Trạng thái</dt>
                    <dd>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(destination.status)}`}>
                        {getStatusText(destination.status)}
                      </span>
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
