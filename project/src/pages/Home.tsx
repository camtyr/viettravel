import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useData, Destination } from '../contexts/DataContext';
import { MapPinIcon, StarIcon, UserGroupIcon, TruckIcon, CheckBadgeIcon } from '@heroicons/react/24/solid';

const Home: React.FC = () => {
  const { publicDestinations, fetchPublicDestinations } = useData();

  // Fetch dữ liệu mỗi lần component mount
  useEffect(() => {
    fetchPublicDestinations();
  }, [fetchPublicDestinations]);

  const featured: Destination[] = publicDestinations
    .filter(d => d.status === 'Approved')
    .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
    .slice(0, 6);

  const totalApproved = publicDestinations.filter(d => d.status === 'Approved');
  const stats = {
    totalDestinations: totalApproved.length,
    totalReviews: totalApproved.reduce((sum, d) => sum + (d.ratingCount ?? 0), 0),
    avgRating: totalApproved.length > 0
      ? totalApproved.reduce((sum, d) => sum + (d.rating ?? 0), 0) / totalApproved.length
      : 0,
  };

  const getDestinationImage = (dest: Destination) =>
    dest.urlPicture && dest.urlPicture.length > 0
      ? dest.urlPicture[0]
      : 'https://via.placeholder.com/400x300?text=No+Image';

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-24 md:py-32 text-center">
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
      </section>

      {/* Stats */}
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

      {/* Featured */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Địa điểm nổi bật</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Những điểm đến được yêu thích nhất với đánh giá cao từ cộng đồng du khách
            </p>
          </div>

          {featured.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featured.map(dest => (
                <Link
                  key={dest.id}
                  to={`/destinations/${dest.id}`}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden card-hover group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={getDestinationImage(dest)}
                      alt={dest.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4">
                      <div className="bg-white bg-opacity-90 px-2 py-1 rounded-full flex items-center space-x-1">
                        <StarIcon className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm font-medium">{dest.rating ?? 0}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{dest.name}</h3>
                      <CheckBadgeIcon className="h-5 w-5 text-green-500" />
                    </div>
                    <p className="text-gray-600 mb-3 line-clamp-2">{dest.description}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <MapPinIcon className="h-4 w-4" />
                        <span>{dest.location}</span>
                      </div>
                      <span>{dest.ratingCount ?? 0} đánh giá</span>
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
        </div>
      </section>
    </div>
  );
};

export default Home;
