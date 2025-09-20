import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
import { 
  MapPinIcon, 
  StarIcon,
  ClockIcon,
  CheckBadgeIcon,
  XCircleIcon,
  ChartBarIcon,
  EyeIcon
} from '@heroicons/react/24/outline';

const AdminDashboard: React.FC = () => {
  const { destinations, reviews } = useData();

  // Calculate statistics
  const stats = {
    total: destinations.length,
    approved: destinations.filter(d => d.status === 'Approved').length,
    pending: destinations.filter(d => d.status === 'Pending').length,
    rejected: destinations.filter(d => d.status === 'Rejected').length,
    totalReviews: reviews.length,
    avgRating: destinations.length > 0 
      ? destinations.reduce((sum, d) => sum + d.rating, 0) / destinations.length 
      : 0,
  };

  // Recent destinations (last 5)
  const recentDestinations = destinations
    .sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime())
    .slice(0, 5);

  // Top rated destinations
  const topRatedDestinations = destinations
    .filter(d => d.status === 'Approved' && d.rating > 0)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
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

  const getImage = (dest: typeof destinations[0]) => {
    return dest.urlPicture && dest.urlPicture.length > 0
      ? dest.urlPicture[0]
      : 'https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg?auto=compress&cs=tinysrgb&w=200';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Admin</h1>
            <p className="text-gray-600">Tổng quan về hệ thống quản lý địa điểm du lịch</p>
          </div>
          <Link
            to="/admin/destinations"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <MapPinIcon className="h-5 w-5" />
            <span>Quản lý địa điểm</span>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { title: 'Tổng địa điểm', value: stats.total, icon: MapPinIcon, color: 'blue' },
            { title: 'Đã duyệt', value: stats.approved, icon: CheckBadgeIcon, color: 'green' },
            { title: 'Chờ duyệt', value: stats.pending, icon: ClockIcon, color: 'yellow' },
            { title: 'Tổng đánh giá', value: stats.totalReviews, icon: StarIcon, color: 'purple' },
          ].map((stat) => (
            <div key={stat.title} className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className={`text-3xl font-bold text-${stat.color}-600`}>{stat.value}</p>
                </div>
                <div className={`bg-${stat.color}-100 p-3 rounded-lg`}>
                  <stat.icon className={`h-8 w-8 text-${stat.color}-600`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Status Distribution */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center space-x-2">
            <ChartBarIcon className="h-6 w-6" />
            <span>Phân bố trạng thái</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { status: 'Approved', count: stats.approved, color: 'green', icon: CheckBadgeIcon },
              { status: 'Pending', count: stats.pending, color: 'yellow', icon: ClockIcon },
              { status: 'Rejected', count: stats.rejected, color: 'red', icon: XCircleIcon },
            ].map((s) => (
              <div key={s.status} className="text-center">
                <div className={`bg-${s.color}-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <s.icon className={`h-8 w-8 text-${s.color}-600`} />
                </div>
                <h3 className={`text-2xl font-bold text-${s.color}-600 mb-1`}>{s.count}</h3>
                <p className="text-gray-600">{getStatusText(s.status)}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {stats.total > 0 ? Math.round((s.count / stats.total) * 100) : 0}% tổng số
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Destinations */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Địa điểm gần đây</h2>
              <Link to="/admin/destinations" className="text-blue-600 hover:text-blue-700 text-sm font-medium">Xem tất cả →</Link>
            </div>
            {recentDestinations.length > 0 ? (
              <div className="space-y-4">
                {recentDestinations.map(dest => (
                  <div key={dest.id} className="flex items-center space-x-4 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <img
                      src={getImage(dest)}
                      alt={dest.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 truncate">{dest.name}</h3>
                      <p className="text-sm text-gray-500">{dest.location}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(dest.status)}`}>
                        {getStatusText(dest.status)}
                      </span>
                      <span className="text-xs text-gray-500">{formatDate(dest.createdDate)}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <MapPinIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500">Chưa có địa điểm nào</p>
              </div>
            )}
          </div>

          {/* Top Rated Destinations */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Đánh giá cao nhất</h2>
              <Link to="/destinations" className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1">
                <span>Xem tất cả</span>
                <EyeIcon className="h-4 w-4" />
              </Link>
            </div>
            {topRatedDestinations.length > 0 ? (
              <div className="space-y-4">
                {topRatedDestinations.map(dest => (
                  <div key={dest.id} className="flex items-center space-x-4 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <img
                      src={getImage(dest)}
                      alt={dest.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 truncate">{dest.name}</h3>
                      <p className="text-sm text-gray-500">{dest.location}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        <StarIcon className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm font-medium">{dest.rating.toFixed(1)}</span>
                      </div>
                      <span className="text-xs text-gray-500">({dest.ratingCount} đánh giá)</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <StarIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500">Chưa có địa điểm nào được đánh giá</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-md p-6 text-white">
          <h2 className="text-xl font-semibold mb-4">Thao tác nhanh</h2>
          <div className="flex flex-wrap gap-4">
            <Link to="/admin/destinations" className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition-colors flex items-center space-x-2">
              <MapPinIcon className="h-5 w-5" />
              <span>Quản lý địa điểm</span>
            </Link>
            <Link to="/destinations" className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition-colors flex items-center space-x-2">
              <EyeIcon className="h-5 w-5" />
              <span>Xem trang công khai</span>
            </Link>
            <Link to="/create-destination" className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition-colors flex items-center space-x-2">
              <span>Thêm địa điểm mới</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
