import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  MapPinIcon, 
  UserIcon, 
  Bars3Icon, 
  XMarkIcon,
  HomeIcon,
  PlusIcon,
  CogIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';

const Navbar: React.FC = () => {
  const { username, role, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2" onClick={closeMobileMenu}>
            <MapPinIcon className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-800">VietTravel</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-blue-600 transition-colors flex items-center space-x-1"
            >
              <HomeIcon className="h-4 w-4" />
              <span>Trang chủ</span>
            </Link>
            <Link 
              to="/destinations" 
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Địa điểm
            </Link>
            
            {username ? (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/create-destination" 
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-1"
                >
                  <PlusIcon className="h-4 w-4" />
                  <span>Thêm địa điểm</span>
                </Link>
                
                <div className="relative group">
                  <button className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors">
                    <UserIcon className="h-5 w-5" />
                    <span>{username}</span>
                  </button>
                  
                  {/* Dropdown menu */}
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all">
                    <Link 
                      to="/my-destinations" 
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      Địa điểm của tôi
                    </Link>
                    <Link 
                      to="/change-password" 
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      Đổi mật khẩu
                    </Link>
                    {role === 'Admin' && (
                      <>
                        <Link 
                          to="/admin" 
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors flex items-center space-x-2"
                        >
                          <CogIcon className="h-4 w-4" />
                          <span>Dashboard Admin</span>
                        </Link>
                        <Link 
                          to="/admin/destinations" 
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                          Quản lý địa điểm
                        </Link>
                      </>
                    )}
                    <button 
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors flex items-center space-x-2"
                    >
                      <ArrowRightOnRectangleIcon className="h-4 w-4" />
                      <span>Đăng xuất</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/login" 
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Đăng nhập
                </Link>
                <Link 
                  to="/register" 
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Đăng ký
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-blue-600 transition-colors flex items-center space-x-2"
                onClick={closeMobileMenu}
              >
                <HomeIcon className="h-4 w-4" />
                <span>Trang chủ</span>
              </Link>
              <Link 
                to="/destinations" 
                className="text-gray-700 hover:text-blue-600 transition-colors"
                onClick={closeMobileMenu}
              >
                Địa điểm
              </Link>
              
              {username ? (
                <>
                  <Link 
                    to="/create-destination" 
                    className="text-blue-600 font-medium flex items-center space-x-2"
                    onClick={closeMobileMenu}
                  >
                    <PlusIcon className="h-4 w-4" />
                    <span>Thêm địa điểm</span>
                  </Link>
                  <Link 
                    to="/my-destinations" 
                    className="text-gray-700 hover:text-blue-600 transition-colors"
                    onClick={closeMobileMenu}
                  >
                    Địa điểm của tôi
                  </Link>
                  <Link 
                    to="/change-password" 
                    className="text-gray-700 hover:text-blue-600 transition-colors"
                    onClick={closeMobileMenu}
                  >
                    Đổi mật khẩu
                  </Link>
                  {role === 'Admin' && (
                    <>
                      <Link 
                        to="/admin" 
                        className="text-gray-700 hover:text-blue-600 transition-colors flex items-center space-x-2"
                        onClick={closeMobileMenu}
                      >
                        <CogIcon className="h-4 w-4" />
                        <span>Dashboard Admin</span>
                      </Link>
                      <Link 
                        to="/admin/destinations" 
                        className="text-gray-700 hover:text-blue-600 transition-colors"
                        onClick={closeMobileMenu}
                      >
                        Quản lý địa điểm
                      </Link>
                    </>
                  )}
                  <button 
                    onClick={handleLogout}
                    className="text-left text-gray-700 hover:text-blue-600 transition-colors flex items-center space-x-2"
                  >
                    <ArrowRightOnRectangleIcon className="h-4 w-4" />
                    <span>Đăng xuất ({username})</span>
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="text-gray-700 hover:text-blue-600 transition-colors"
                    onClick={closeMobileMenu}
                  >
                    Đăng nhập
                  </Link>
                  <Link 
                    to="/register" 
                    className="text-blue-600 font-medium"
                    onClick={closeMobileMenu}
                  >
                    Đăng ký
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;