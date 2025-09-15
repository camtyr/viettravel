import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useData, Destination } from '../../contexts/DataContext';
import { 
  MagnifyingGlassIcon, 
  MapPinIcon, 
  StarIcon,
  FunnelIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const categories = [
  { id: '', name: 'Tất cả' },
  { id: 'nature', name: 'Thiên nhiên' },
  { id: 'cultural', name: 'Văn hóa' },
  { id: 'historical', name: 'Lịch sử' },
  { id: 'beach', name: 'Biển' },
  { id: 'mountain', name: 'Núi' },
  { id: 'city', name: 'Thành phố' },
];

const Destinations: React.FC = () => {
  const { publicDestinations, fetchPublicDestinations } = useData();
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<'name' | 'rating' | 'newest'>('rating');

  // Lấy dữ liệu public khi mount
  useEffect(() => {
    fetchPublicDestinations();
  }, []);

  // Cập nhật danh sách destinations khi publicDestinations thay đổi
  useEffect(() => {
    setDestinations(publicDestinations);
  }, [publicDestinations]);

  // Lọc, tìm kiếm và sắp xếp
  const filteredAndSortedDestinations = useMemo(() => {
    let results = [...destinations];

    // Filter theo category
    if (selectedCategory) {
      results = results.filter(d => d.category === selectedCategory);
    }

    // Search theo tên và mô tả
    if (searchQuery) {
      const keyword = searchQuery.toLowerCase();
      results = results.filter(d => 
        d.name.toLowerCase().includes(keyword) || 
        d.description.toLowerCase().includes(keyword)
      );
    }

    // Sort
    results.sort((a, b) => {
      switch (sortBy) {
        case 'name': return a.name.localeCompare(b.name);
        case 'rating': return b.rating - a.rating;
        case 'newest': return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime();
        default: return 0;
      }
    });

    return results;
  }, [destinations, selectedCategory, sortBy, searchQuery]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSortBy('rating');
  };

  const hasActiveFilters = searchQuery || selectedCategory || sortBy !== 'rating';

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Khám phá địa điểm</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Tìm kiếm và khám phá những điểm đến tuyệt vời được chia sẻ bởi cộng đồng
          </p>
        </div>

        {/* Search & Filters */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm địa điểm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filter Toggle Mobile */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <FunnelIcon className="h-5 w-5" />
              <span>Bộ lọc</span>
            </button>

            {/* Desktop Filters */}
            <div className="hidden lg:flex items-center space-x-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'name' | 'rating' | 'newest')}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="rating">Đánh giá cao nhất</option>
                <option value="name">Tên A-Z</option>
                <option value="newest">Mới nhất</option>
              </select>

              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="flex items-center space-x-1 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg border border-red-200"
                >
                  <XMarkIcon className="h-4 w-4" />
                  <span>Xóa lọc</span>
                </button>
              )}
            </div>
          </div>

          {/* Mobile Filters */}
          {showFilters && (
            <div className="lg:hidden mt-4 pt-4 border-t border-gray-200 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Danh mục</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sắp xếp</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'name' | 'rating' | 'newest')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="rating">Đánh giá cao nhất</option>
                  <option value="name">Tên A-Z</option>
                  <option value="newest">Mới nhất</option>
                </select>
              </div>

              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="w-full flex items-center justify-center space-x-1 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg border border-red-200"
                >
                  <XMarkIcon className="h-4 w-4" />
                  <span>Xóa bộ lọc</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Results */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-gray-600">
            Tìm thấy <span className="font-semibold">{filteredAndSortedDestinations.length}</span> địa điểm
          </p>
        </div>

        {/* Destinations Grid */}
        {filteredAndSortedDestinations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAndSortedDestinations.map(destination => (
              <Link
                key={destination.id}
                to={`/destinations/${destination.id}`}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden card-hover group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={destination.urlPicture || 'https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg?auto=compress&cs=tinysrgb&w=800'}
                    alt={destination.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <div className="bg-white bg-opacity-90 px-2 py-1 rounded-full flex items-center space-x-1">
                      <StarIcon className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm font-medium">{destination.rating > 0 ? destination.rating.toFixed(1) : 'N/A'}</span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {destination.name}
                  </h3>
                  <p className="text-gray-600 mb-3 line-clamp-2">{destination.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <MapPinIcon className="h-4 w-4" />
                      <span>{destination.location}</span>
                    </div>
                    <span>{destination.ratingCount} đánh giá</span>
                  </div>
                  <div className="mt-3">
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                      {categories.find(c => c.id === destination.category)?.name || 'Khác'}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 mb-6">Không tìm thấy địa điểm nào</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Destinations;
