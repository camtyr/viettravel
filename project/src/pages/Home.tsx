import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import { 
  MapPinIcon, 
  StarIcon, 
  UserGroupIcon,
  TruckIcon,
  CheckBadgeIcon 
} from '@heroicons/react/24/solid';

const Home: React.FC = () => {
  const { publicDestinations } = useData();
  
  const approvedDestinations = publicDestinations
    .filter(dest => dest.status === 'Approved')
    .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
    .slice(0, 6);

  // Stats an toàn, tránh NaN
  const stats = {
    totalDestinations: publicDestinations.filter(d => d.status === 'Approved').length,
    totalReviews: publicDestinations.reduce((sum, d) => sum + (d.ratingCount ?? 0), 0),
    avgRating: publicDestinations.length > 0 
      ? publicDestinations.reduce((sum, d) => sum + (d.rating ?? 0), 0) / publicDestinations.length
      : 0,
  };

  // Lấy ảnh đầu tiên, fallback nếu không có
  const getDestinationImage = (dest: typeof approvedDestinations[0]) =>
    dest.urlPicture && dest.urlPicture.length > 0
      ? dest.urlPicture[0]
      : 'https://via.placeholder.com/400x300?text=No+Image';

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg?auto=compress&cs=tinysrgb&w=1920)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Khám phá <span className="text-yellow-400">Việt Nam</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
            Tìm kiếm những địa điểm tuyệt vời nhất, chia sẻ trải nghiệm và khám phá vẻ đẹp của đất nước ta
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/destinations"
              className="btn-primary text-white px-8 py-4 rounded-lg font-semibold text-lg inline-flex items-center justify-center space-x-2"
            >
              <MapPinIcon className="h-5 w-5" />
              <span>Khám phá ngay</span>
            </Link>
            <Link
              to="/create-destination"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors inline-flex items-center justify-center space-x-2"
            >
              <TruckIcon className="h-5 w-5" />
              <span>Chia sẻ địa điểm</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPinIcon className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">{stats.totalDestinations}</h3>
            <p className="text-gray-600">Địa điểm du lịch</p>
          </div>
          <div>
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserGroupIcon className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">{stats.totalReviews}</h3>
            <p className="text-gray-600">Đánh giá từ du khách</p>
          </div>
          <div>
            <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <StarIcon className="h-8 w-8 text-yellow-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">{stats.avgRating.toFixed(1)}</h3>
            <p className="text-gray-600">Đánh giá trung bình</p>
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Địa điểm nổi bật
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Những điểm đến được yêu thích nhất với đánh giá cao từ cộng đồng du khách
            </p>
          </div>

          {approvedDestinations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {approvedDestinations.map((destination) => (
                <Link
                  key={destination.id}
                  to={`/destinations/${destination.id}`}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden card-hover group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={getDestinationImage(destination)}
                      alt={destination.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4">
                      <div className="bg-white bg-opacity-90 px-2 py-1 rounded-full flex items-center space-x-1">
                        <StarIcon className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm font-medium">{destination.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {destination.name}
                      </h3>
                      <CheckBadgeIcon className="h-5 w-5 text-green-500" />
                    </div>
                    <p className="text-gray-600 mb-3 line-clamp-2">{destination.description}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <MapPinIcon className="h-4 w-4" />
                        <span>{destination.location}</span>
                      </div>
                      <span>{destination.ratingCount} đánh giá</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <MapPinIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">Chưa có địa điểm nào được phê duyệt</p>
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              to="/destinations"
              className="inline-flex items-center space-x-2 bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              <span>Xem tất cả địa điểm</span>
              <MapPinIcon className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Chia sẻ địa điểm yêu thích của bạn
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Giúp cộng đồng du lịch khám phá những điểm đến tuyệt vời mà bạn đã trải nghiệm
          </p>
          <Link
            to="/create-destination"
            className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors inline-flex items-center space-x-2"
          >
            <TruckIcon className="h-5 w-5" />
            <span>Thêm địa điểm ngay</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
