import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';
import { PlusIcon, MapPinIcon} from '@heroicons/react/24/outline';

const categories = [
  { id: 'nature', name: 'Thiên nhiên' },
  { id: 'cultural', name: 'Văn hóa' },
  { id: 'historical', name: 'Lịch sử' },
  { id: 'beach', name: 'Biển' },
  { id: 'mountain', name: 'Núi' },
  { id: 'city', name: 'Thành phố' },
];

const CreateDestination: React.FC = () => {
  const { addDestination } = useData();
  const { id,username,role } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    imageUrl: '',
    category: 'nature',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username) return;

    setIsSubmitting(true);

    const destinationData = {
  name: formData.name,
  location: formData.location,
  category: formData.category,
  urlPicture: formData.imageUrl,
  description: formData.description,
  createdById: id, 
  status: role === 'Admin' ? 'Approved' as const : 'Pending' as const,
};

    addDestination(destinationData);
    
    // Redirect after successful creation
    navigate('/my-destinations');
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const sampleImages = [
    'https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/2101137/pexels-photo-2101137.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/2399012/pexels-photo-2399012.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/2385477/pexels-photo-2385477.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg?auto=compress&cs=tinysrgb&w=800',
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Thêm địa điểm mới</h1>
          <p className="text-lg text-gray-600">
            Chia sẻ những địa điểm tuyệt vời mà bạn đã khám phá với cộng đồng
          </p>
          {role !== 'admin' && (
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Lưu ý:</strong> Địa điểm của bạn sẽ được kiểm duyệt trước khi xuất hiện công khai
              </p>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-8">
          <div className="space-y-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Tên địa điểm <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="VD: Vịnh Hạ Long"
              />
            </div>

            {/* Location */}
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                Vị trí <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="VD: Quảng Ninh, Việt Nam"
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Danh mục <span className="text-red-500">*</span>
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Image URL */}
            <div>
              <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-2">
                URL hình ảnh <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                id="imageUrl"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
                placeholder="https://example.com/image.jpg"
              />
              
              {/* Image Preview */}
              {formData.imageUrl && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Xem trước:</p>
                  <div className="relative h-48 rounded-lg overflow-hidden border border-gray-200">
                    <img
                      src={formData.imageUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg?auto=compress&cs=tinysrgb&w=800';
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Sample Images */}
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Hoặc chọn từ thư viện mẫu:</p>
                <div className="grid grid-cols-3 gap-3">
                  {sampleImages.map((imageUrl, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setFormData({ ...formData, imageUrl })}
                      className="relative h-20 rounded-lg overflow-hidden border-2 border-transparent hover:border-blue-500 transition-colors"
                    >
                      <img
                        src={imageUrl}
                        alt={`Sample ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Mô tả <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Mô tả chi tiết về địa điểm, điều gì làm nó đặc biệt, trải nghiệm du khách có thể có..."
              />
              <p className="mt-2 text-sm text-gray-500">
                Tối thiểu 50 ký tự ({formData.description.length}/50)
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8 flex items-center justify-between">
            <button
              type="button"
              onClick={() => navigate('/destinations')}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Hủy
            </button>
            
            <button
              type="submit"
              disabled={isSubmitting || formData.description.length < 50}
              className="flex items-center space-x-2 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Đang tạo...</span>
                </>
              ) : (
                <>
                  <PlusIcon className="h-5 w-5" />
                  <span>Tạo địa điểm</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateDestination;