import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useData } from "../../contexts/DataContext";
import {
  EyeIcon,
  TrashIcon,
  CheckIcon,
  XMarkIcon,
  MapPinIcon,
  StarIcon,
  CalendarIcon,
  UserIcon,
  FunnelIcon,
} from "@heroicons/react/24/outline";

const AdminDestinations: React.FC = () => {
  const { destinations, updateDestination, deleteDestination } = useData();
  const [filter, setFilter] = useState<
    "all" | "Approved" | "Pending" | "Rejected"
  >("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDestinations = destinations.filter((dest) => {
    const matchesFilter = filter === "all" || dest.status === filter;
    const matchesSearch =
      !searchQuery ||
      dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.location.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const statusCounts = {
    all: destinations.length,
    approved: destinations.filter((d) => d.status === "Approved").length,
    pending: destinations.filter((d) => d.status === "Pending").length,
    rejected: destinations.filter((d) => d.status === "Rejected").length,
  };

  const handleApprove = (id: number) => updateDestination(id, "Approve");
  const handleReject = (id: number) => updateDestination(id, "Reject");
  const handleDelete = (id: number, name: string) => {
    if (
      window.confirm(
        `Bạn có chắc chắn muốn xóa địa điểm "${name}"? Thao tác này không thể hoàn tác.`
      )
    ) {
      deleteDestination(id);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "text-green-600 bg-green-100";
      case "Pending":
        return "text-yellow-600 bg-yellow-100";
      case "Rejected":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "Approved":
        return "Đã duyệt";
      case "Pending":
        return "Chờ duyệt";
      case "Rejected":
        return "Bị từ chối";
      default:
        return "Không xác định";
    }
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const getImage = (dest: (typeof destinations)[0]) =>
    dest.urlPicture && dest.urlPicture.length > 0
      ? dest.urlPicture[0]
      : "https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg?auto=compress&cs=tinysrgb&w=400";

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Quản lý địa điểm
            </h1>
            <p className="text-gray-600">
              Duyệt và quản lý các địa điểm được chia sẻ bởi người dùng
            </p>
          </div>
          <Link
            to="/admin"
            className="mt-4 sm:mt-0 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
          >
            ← Quay lại Dashboard
          </Link>
        </div>

        {/* Search & Filter */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 flex flex-col md:flex-row gap-4 items-center">
          <input
            type="text"
            placeholder="Tìm kiếm theo tên hoặc vị trí..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="flex items-center space-x-2">
            <FunnelIcon className="h-5 w-5 text-gray-400" />
            <span className="text-sm text-gray-600">Lọc theo trạng thái:</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="flex flex-wrap border-b border-gray-200">
            {[
              { key: "all", label: "Tất cả", count: statusCounts.all },
              {
                key: "Pending",
                label: "Chờ duyệt",
                count: statusCounts.pending,
              },
              {
                key: "Approved",
                label: "Đã duyệt",
                count: statusCounts.approved,
              },
              {
                key: "Rejected",
                label: "Bị từ chối",
                count: statusCounts.rejected,
              },
            ].map((tab) => (
              <button
                key={tab.key}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onClick={() => setFilter(tab.key as any)}
                className={`px-6 py-4 border-b-2 font-medium text-sm transition-colors ${
                  filter === tab.key
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
        </div>

        {/* Destinations */}
        {filteredDestinations.length > 0 ? (
          <div className="space-y-4">
            {filteredDestinations
              .sort((a, b) => {
                if (a.status === "Pending" && b.status !== "Pending") return -1;
                if (a.status !== "Pending" && b.status === "Pending") return 1;
                return (
                  new Date(b.createdDate).getTime() -
                  new Date(a.createdDate).getTime()
                );
              })
              .map((dest) => (
                <div
                  key={dest.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="flex flex-col lg:flex-row">
                    <div className="lg:w-64 h-48 lg:h-auto">
                      <img
                        src={getImage(dest)}
                        alt={dest.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 p-6">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-xl font-semibold text-gray-900">
                              {dest.name}
                            </h3>
                            <span
                              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                                dest.status
                              )}`}
                            >
                              {getStatusText(dest.status)}
                            </span>
                          </div>
                          <div className="flex items-center text-gray-600 text-sm mb-2">
                            <MapPinIcon className="h-4 w-4 mr-1" />
                            <span>{dest.location}</span>
                          </div>
                          <p className="text-gray-700 mb-3 line-clamp-2">
                            {dest.description}
                          </p>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center">
                              <UserIcon className="h-4 w-4 mr-1" />
                              <span>ID: {dest.createdById}</span>
                            </div>
                            <div className="flex items-center">
                              <CalendarIcon className="h-4 w-4 mr-1" />
                              <span>{formatDate(dest.createdDate)}</span>
                            </div>
                            <div className="flex items-center">
                              <StarIcon className="h-4 w-4 mr-1 text-yellow-500" />
                              <span>
                                {dest.rating > 0
                                  ? dest.rating.toFixed(1)
                                  : "N/A"}
                              </span>
                              <span className="ml-1">
                                ({dest.ratingCount} đánh giá)
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-gray-200">
                        <Link
                          to={`/destinations-detail/${dest.id}`}
                          className="flex items-center space-x-1 px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                        >
                          <EyeIcon className="h-4 w-4" />
                          <span>Xem chi tiết</span>
                        </Link>

                        {dest.status === "Pending" && (
                          <>
                            <button
                              onClick={() => handleApprove(dest.id)}
                              className="flex items-center space-x-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                            >
                              <CheckIcon className="h-4 w-4" />
                              <span>Duyệt</span>
                            </button>
                            <button
                              onClick={() => handleReject(dest.id)}
                              className="flex items-center space-x-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                            >
                              <XMarkIcon className="h-4 w-4" />
                              <span>Từ chối</span>
                            </button>
                          </>
                        )}

                        {dest.status === "Approved" && (
                          <button
                            onClick={() => handleReject(dest.id)}
                            className="flex items-center space-x-1 px-4 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-colors"
                          >
                            <XMarkIcon className="h-4 w-4" />
                            <span>Thu hồi</span>
                          </button>
                        )}

                        {dest.status === "Rejected" && (
                          <button
                            onClick={() => handleApprove(dest.id)}
                            className="flex items-center space-x-1 px-4 py-2 text-green-600 border border-green-600 rounded-lg hover:bg-green-50 transition-colors"
                          >
                            <CheckIcon className="h-4 w-4" />
                            <span>Phê duyệt lại</span>
                          </button>
                        )}

                        <button
                          onClick={() => handleDelete(dest.id, dest.name)}
                          className="flex items-center space-x-1 px-4 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
                        >
                          <TrashIcon className="h-4 w-4" />
                          <span>Xóa</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <MapPinIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Không tìm thấy địa điểm nào
            </h3>
            <p className="text-gray-500 mb-6">
              {filter === "all"
                ? "Chưa có địa điểm nào trong hệ thống"
                : `Không có địa điểm nào với trạng thái "${getStatusText(
                    filter
                  )}"`}
            </p>
            {(searchQuery || filter !== "all") && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setFilter("all");
                }}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Xóa bộ lọc
              </button>
            )}
          </div>
        )}

        {/* Summary Stats */}
        {destinations.length > 0 && (
          <div className="mt-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-md p-6 text-white">
            <h3 className="text-lg font-semibold mb-4">Tóm tắt thống kê</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{statusCounts.pending}</div>
                <div className="text-blue-100 text-sm">Cần duyệt</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {statusCounts.approved}
                </div>
                <div className="text-blue-100 text-sm">Đã duyệt</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {statusCounts.rejected}
                </div>
                <div className="text-blue-100 text-sm">Đã từ chối</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{statusCounts.all}</div>
                <div className="text-blue-100 text-sm">Tổng cộng</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDestinations;
