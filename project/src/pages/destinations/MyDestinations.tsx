import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
import { 
  EyeIcon, 
  TrashIcon, 
  PlusIcon,
  MapPinIcon,
  StarIcon,
  CheckBadgeIcon,
  ClockIcon,
  XCircleIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';

const MyDestinations: React.FC = () => {
  const { myOwnDestinations, deleteMyDestination } = useData();
  const [filter, setFilter] = useState<'all' | 'Approved' | 'Pending' | 'Rejected'>('all');

  // Không cần filter createdById nữa vì API đã trả đúng địa điểm của user
  const myDestinations = myOwnDestinations;

  // Lọc theo trạng thái
  const filteredDestinations = myDestinations.filter(dest => {
    if (filter === 'all') return true;
    return dest.status === filter;
  });

  const statusCounts = {
    all: myDestinations.length,
    approved: myDestinations.filter(d => d.status === 'Approved').length,
    pending: myDestinations.filter(d => d.status === 'Pending').length,
    rejected: myDestinations.filter(d => d.status === 'Rejected').length,
  };

  const handleDelete = (id: number, name: string) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa địa điểm "${name}"?`)) {
      deleteMyDestination(id);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'text-green-600 bg-green-100';
      case 'Pending': return 'text-yellow-600 bg-yellow-100';
      case 'Rejected': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'Approved': return 'Đã duyệt';
      case 'Pending': return 'Chờ duyệt';
      case 'Rejected': return 'Bị từ chối';
      default: return 'Không xác định';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Approved': return <CheckBadgeIcon className="h-4 w-4" />;
      case 'Pending': return <ClockIcon className="h-4 w-4" />;
      case 'Rejected': return <XCircleIcon className="h-4 w-4" />;
      default: return null;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getImage = (dest: typeof myDestinations[0]) => {
    return dest.urlPicture && dest.urlPicture.length > 0
      ? dest.urlPicture[0]
      : 'https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg?auto=compress&cs=tinysrgb&w=800';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Địa điểm của tôi</h1>
            <p className="text-gray-600">Quản lý các địa điểm bạn đã chia sẻ</p>
          </div>
          <Link
            to="/create-destination"
            className="mt-4 sm:mt-0 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <PlusIcon className="h-5 w-5" />
            <span>Thêm địa điểm mới</span>
          </Link>
        </div>

        {/* Status Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="flex flex-wrap border-b border-gray-200">
            {[
              { key: 'all', label: 'Tất cả', count: statusCounts.all },
              { key: 'Approved', label: 'Đã duyệt', count: statusCounts.approved },
              { key: 'Pending', label: 'Chờ duyệt', count: statusCounts.pending },
              { key: 'Rejected', label: 'Bị từ chối', count: statusCounts.rejected },
            ].map(tab => (
              <button
                key={tab.key}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onClick={() => setFilter(tab.key as any)}
                className={`px-6 py-4 border-b-2 font-medium text-sm transition-colors ${
                  filter === tab.key
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
        </div>

        {/* Destinations List */}
        {filteredDestinations.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredDestinations
              .sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime())
              .map(destination => (
                <div key={destination.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <img
                      src={getImage(destination)}
                      alt={destination.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(destination.status)}`}>
                        {getStatusIcon(destination.status)}
                        <span className="ml-1">{getStatusText(destination.status)}</span>
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{destination.name}</h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{destination.description}</p>
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <MapPinIcon className="h-4 w-4 mr-1" />
                      <span className="truncate">{destination.location}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center">
                          <StarIcon className="h-4 w-4 mr-1 text-yellow-500" />
                          <span>{destination.rating > 0 ? destination.rating.toFixed(1) : 'N/A'}</span>
                        </div>
                        <span>{destination.ratingCount} đánh giá</span>
                      </div>
                      <div className="flex items-center">
                        <CalendarIcon className="h-4 w-4 mr-1" />
                        <span>{formatDate(destination.createdDate)}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <Link
                        to={`/destinations-detail/${destination.id}`}
                        className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        <EyeIcon className="h-4 w-4" />
                        <span className="text-sm font-medium">Xem chi tiết</span>
                      </Link>

                      <button
                        onClick={() => handleDelete(destination.id, destination.name)}
                        className="flex items-center space-x-1 text-red-600 hover:text-red-700 transition-colors"
                      >
                        <TrashIcon className="h-4 w-4" />
                        <span className="text-sm font-medium">Xóa</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <MapPinIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {filter === 'all' 
                ? 'Bạn chưa có địa điểm nào'
                : `Không có địa điểm nào với trạng thái "${getStatusText(filter)}"`
              }
            </h3>
            <p className="text-gray-500 mb-6">
              {filter === 'all' 
                ? 'Hãy chia sẻ những địa điểm tuyệt vời mà bạn đã khám phá'
                : 'Thử chuyển sang tab khác để xem các địa điểm của bạn'
              }
            </p>
            {filter === 'all' && (
              <Link
                to="/create-destination"
                className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                <PlusIcon className="h-5 w-5" />
                <span>Thêm địa điểm đầu tiên</span>
              </Link>
            )}
          </div>
        )}

        {/* Status Info */}
        {myDestinations.length > 0 && (
          <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Thông tin trạng thái</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <CheckBadgeIcon className="h-5 w-5 text-green-600" />
                <span className="text-gray-700"><strong>Đã duyệt:</strong> Hiển thị công khai, có thể nhận đánh giá</span>
              </div>
              <div className="flex items-center space-x-2">
                <ClockIcon className="h-5 w-5 text-yellow-600" />
                <span className="text-gray-700"><strong>Chờ duyệt:</strong> Đang được admin xem xét</span>
              </div>
              <div className="flex items-center space-x-2">
                <XCircleIcon className="h-5 w-5 text-red-600" />
                <span className="text-gray-700"><strong>Bị từ chối:</strong> Không hiển thị công khai</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyDestinations;
