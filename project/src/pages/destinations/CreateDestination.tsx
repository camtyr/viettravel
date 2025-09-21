import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';
import {
  PlusIcon,
  MapPinIcon,
  PhotoIcon,
  XMarkIcon,
  CloudArrowUpIcon
} from '@heroicons/react/24/outline';

const categories = [
  { id: 'nature', name: 'Thiên nhiên' },
  { id: 'cultural', name: 'Văn hóa' },
  { id: 'historical', name: 'Lịch sử' },
  { id: 'beach', name: 'Biển' },
  { id: 'mountain', name: 'Núi' },
  { id: 'city', name: 'Thành phố' },
];

const sampleImages = [
  'https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/2101137/pexels-photo-2101137.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/2399012/pexels-photo-2399012.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/2385477/pexels-photo-2385477.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg?auto=compress&cs=tinysrgb&w=800',
];

const CreateDestination: React.FC = () => {
  const { addDestination } = useData();
  const {  username, role } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    category: 'nature',
  });
  const [selectedImages, setSelectedImages] = useState<(string | File)[]>([]);
  const [showImageLibrary, setShowImageLibrary] = useState(false);

  // ------------------ Handle Form Submit ------------------
  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!username || selectedImages.length === 0) return;

  setIsSubmitting(true);

  try {
    // Lọc chỉ các file upload từ máy
    const filesToUpload = selectedImages.filter(img => img instanceof File) as File[];

    if (filesToUpload.length === 0) {
      alert("Bạn phải chọn ít nhất 1 ảnh từ máy tính!");
      setIsSubmitting(false);
      return;
    }

    const destinationData = {
      name: formData.name,
      location: formData.location,
      category: formData.category,
      description: formData.description,
      files: filesToUpload, // gửi mảng file
    };

    await addDestination(destinationData);
    navigate("/my-destinations");
  } catch (error) {
    console.error("Error creating destination:", error);
  } finally {
    setIsSubmitting(false);
  }
};



  // ------------------ Handle Input ------------------
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ------------------ Handle Image Selection ------------------
  const handleImageSelect = (imageUrl: string) => {
    if (selectedImages.includes(imageUrl)) {
      setSelectedImages(selectedImages.filter(img => img !== imageUrl));
    } else if (selectedImages.length < 5) {
      setSelectedImages([...selectedImages, imageUrl]);
    }
  };

  const removeImage = (image: string | File) => {
    setSelectedImages(selectedImages.filter(img => img !== image));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file, index) => {
      if (selectedImages.length + index < 5) {
        setSelectedImages(prev => [...prev, file]);
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Thêm địa điểm mới</h1>
          <p className="text-lg text-gray-600">
            Chia sẻ những địa điểm tuyệt vời mà bạn đã khám phá với cộng đồng
          </p>
          {role !== 'Admin' && (
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Lưu ý:</strong> Địa điểm của bạn sẽ được kiểm duyệt trước khi xuất hiện công khai
              </p>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-8">
          <div className="space-y-8">
            {/* Name + Category */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tên địa điểm *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  placeholder="VD: Vịnh Hạ Long"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Danh mục *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                >
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Vị trí *</label>
              <div className="relative">
                <MapPinIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg"
                  placeholder="VD: Quảng Ninh, Việt Nam"
                />
              </div>
            </div>

            {/* Upload Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">Hình ảnh *</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="border-2 border-dashed rounded-lg p-6 text-center">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                    disabled={selectedImages.length >= 5}
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <CloudArrowUpIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                    <p>Tải ảnh từ máy tính</p>
                  </label>
                </div>
                <div className="border-2 border-dashed rounded-lg p-6 text-center">
                  <button type="button" onClick={() => setShowImageLibrary(!showImageLibrary)} className="w-full">
                    <PhotoIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                    <p>Chọn từ thư viện</p>
                  </button>
                </div>
              </div>

              {/* Preview */}
              {selectedImages.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {selectedImages.map((img, i) => (
                    <div key={i} className="relative group">
                      <img
                        src={img instanceof File ? URL.createObjectURL(img) : img}
                        className="w-full h-24 object-cover rounded-lg border"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(img)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100"
                      >
                        <XMarkIcon className="h-4 w-4" />
                      </button>
                      {i === 0 && (
                        <div className="absolute bottom-1 left-1 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                          Ảnh chính
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Library */}
              {showImageLibrary && (
                <div className="mt-4 grid grid-cols-3 md:grid-cols-4 gap-3 max-h-64 overflow-y-auto">
                  {sampleImages.map((url, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleImageSelect(url)}
                      className={`relative h-20 rounded-lg overflow-hidden border-2 ${
                        selectedImages.includes(url) ? 'border-blue-500' : 'border-gray-200'
                      }`}
                    >
                      <img src={url} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mô tả *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              />
              <p className="mt-2 text-sm text-gray-500">
                Tối thiểu 10 ký tự ({formData.description.length}/10)
              </p>
            </div>
          </div>

          {/* Submit */}
          <div className="mt-8 flex justify-between pt-6 border-t">
            <button
              type="button"
              onClick={() => navigate('/destinations')}
              className="px-6 py-3 border rounded-lg"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isSubmitting || formData.description.length < 10 || selectedImages.length === 0}
              className="flex items-center px-8 py-3 bg-blue-600 text-white rounded-lg disabled:opacity-50"
            >
              {isSubmitting ? 'Đang tạo...' : (
                <>
                  <PlusIcon className="h-5 w-5 mr-2" /> Tạo địa điểm
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
