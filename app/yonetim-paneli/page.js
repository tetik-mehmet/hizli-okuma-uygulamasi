"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Filter,
  Edit,
  Trash2,
  X,
  Save,
  Users,
  UserCheck,
  UserX,
  Calendar,
  TrendingUp,
  Shield,
  AlertCircle,
} from "lucide-react";

export default function YonetimPaneli() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Edit form state
  const [editForm, setEditForm] = useState({
    name: "",
    surname: "",
    email: "",
    isSubscribed: false,
    subscriptionType: "",
    subscriptionStartDate: "",
    subscriptionEndDate: "",
    subscriptionStatus: "none",
    freeTrialStarted: false,
    freeTrialEndDate: "",
  });

  // Sayfa yüklendiğinde admin kontrolü ve verileri getir
  useEffect(() => {
    checkAdminAndLoadData();
  }, []);

  // Arama veya filtre değiştiğinde kullanıcıları yeniden yükle
  useEffect(() => {
    if (isAdmin) {
      loadUsers();
    }
  }, [searchTerm, filterStatus, isAdmin]);

  const checkAdminAndLoadData = async () => {
    try {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        router.push("/login");
        return;
      }

      // Admin kontrolü için stats endpoint'ini kullan (admin kontrolü yapıyor)
      const statsResponse = await fetch("/api/admin/stats", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (statsResponse.status === 403) {
        setError("Bu sayfaya erişim yetkiniz yok. Sadece admin kullanıcılar erişebilir.");
        setIsAdmin(false);
        setIsLoading(false);
        return;
      }

      if (!statsResponse.ok) {
        throw new Error("Admin kontrolü başarısız");
      }

      setIsAdmin(true);
      await Promise.all([loadUsers(), loadStats()]);
      setIsLoading(false);
    } catch (error) {
      console.error("Admin check error:", error);
      setError("Bir hata oluştu. Lütfen tekrar deneyin.");
      setIsLoading(false);
    }
  };

  const loadUsers = async () => {
    try {
      setLoading(true);
      const authToken = localStorage.getItem("authToken");
      const params = new URLSearchParams();
      if (searchTerm) params.append("search", searchTerm);
      if (filterStatus !== "all") params.append("subscriptionStatus", filterStatus);

      const response = await fetch(`/api/admin/users?${params.toString()}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!response.ok) throw new Error("Kullanıcılar yüklenemedi");

      const data = await response.json();
      setUsers(data.users || []);
    } catch (error) {
      console.error("Load users error:", error);
      setError("Kullanıcılar yüklenirken bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const authToken = localStorage.getItem("authToken");
      const response = await fetch("/api/admin/stats", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!response.ok) throw new Error("İstatistikler yüklenemedi");

      const data = await response.json();
      setStats(data.stats);
    } catch (error) {
      console.error("Load stats error:", error);
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setEditForm({
      name: user.name || "",
      surname: user.surname || "",
      email: user.email || "",
      isSubscribed: user.isSubscribed || false,
      subscriptionType: user.subscriptionType || "",
      subscriptionStartDate: user.subscriptionStartDate
        ? new Date(user.subscriptionStartDate).toISOString().split("T")[0]
        : "",
      subscriptionEndDate: user.subscriptionEndDate
        ? new Date(user.subscriptionEndDate).toISOString().split("T")[0]
        : "",
      subscriptionStatus: user.subscriptionStatus || "none",
      freeTrialStarted: user.freeTrialStarted || false,
      freeTrialEndDate: user.freeTrialEndDate
        ? new Date(user.freeTrialEndDate).toISOString().split("T")[0]
        : "",
    });
    setShowEditModal(true);
    setError("");
    setSuccess("");
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const authToken = localStorage.getItem("authToken");
      const response = await fetch(`/api/admin/users/${selectedUser.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(editForm),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Güncelleme başarısız");
      }

      setSuccess("Kullanıcı başarıyla güncellendi!");
      setShowEditModal(false);
      await Promise.all([loadUsers(), loadStats()]);
      
      // Success mesajını 3 saniye sonra temizle
      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      console.error("Save error:", error);
      setError(error.message || "Güncelleme sırasında bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
    setError("");
  };

  const handleDeleteConfirm = async () => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const authToken = localStorage.getItem("authToken");
      const response = await fetch(`/api/admin/users/${userToDelete.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Silme başarısız");
      }

      setSuccess("Kullanıcı başarıyla silindi!");
      setShowDeleteModal(false);
      setUserToDelete(null);
      await Promise.all([loadUsers(), loadStats()]);
      
      // Success mesajını 3 saniye sonra temizle
      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      console.error("Delete error:", error);
      setError(error.message || "Silme sırasında bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("tr-TR");
  };

  const getStatusBadge = (user) => {
    if (user.subscriptionStatus === "active" && user.isSubscribed) {
      return (
        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
          Aktif Abonelik
        </span>
      );
    } else if (user.subscriptionStatus === "expired") {
      return (
        <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
          Süresi Dolmuş
        </span>
      );
    } else if (user.freeTrialStarted) {
      const endDate = user.freeTrialEndDate ? new Date(user.freeTrialEndDate) : null;
      const now = new Date();
      if (endDate && endDate > now) {
        return (
          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
            Free Trial (Aktif)
          </span>
        );
      } else {
        return (
          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
            Free Trial (Dolmuş)
          </span>
        );
      }
    } else {
      return (
        <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
          Abonelik Yok
        </span>
      );
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Erişim Reddedildi</h2>
          <p className="text-gray-600 mb-6">{error || "Bu sayfaya erişim yetkiniz yok."}</p>
          <button
            onClick={() => router.push("/genel")}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Ana Sayfaya Dön
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 flex items-center gap-3">
                <Shield className="w-8 h-8 md:w-10 md:h-10 text-blue-600" />
                Yönetim Paneli
              </h1>
              <p className="text-gray-600">Kullanıcıları yönetin ve sistem istatistiklerini görüntüleyin</p>
            </div>
          </div>

          {/* Success/Error Messages */}
          {success && (
            <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
              {success}
            </div>
          )}
          {error && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}
        </div>

        {/* İstatistik Kartları */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-6">
            <div className="bg-white rounded-xl shadow-md p-4">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 text-blue-600" />
                <span className="text-sm text-gray-600">Toplam Kullanıcı</span>
              </div>
              <p className="text-2xl font-bold text-gray-800">{stats.totalUsers}</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-4">
              <div className="flex items-center gap-2 mb-2">
                <UserCheck className="w-5 h-5 text-green-600" />
                <span className="text-sm text-gray-600">Aktif Abonelik</span>
              </div>
              <p className="text-2xl font-bold text-gray-800">{stats.activeSubscriptions}</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-4">
              <div className="flex items-center gap-2 mb-2">
                <UserX className="w-5 h-5 text-red-600" />
                <span className="text-sm text-gray-600">Süresi Dolmuş</span>
              </div>
              <p className="text-2xl font-bold text-gray-800">{stats.expiredSubscriptions}</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-4">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                <span className="text-sm text-gray-600">Free Trial</span>
              </div>
              <p className="text-2xl font-bold text-gray-800">{stats.activeFreeTrial}</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-purple-600" />
                <span className="text-sm text-gray-600">Son 7 Gün</span>
              </div>
              <p className="text-2xl font-bold text-gray-800">{stats.lastWeekUsers}</p>
            </div>
          </div>
        )}

        {/* Arama ve Filtre */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Kullanıcı ara (ad, soyad, email)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
              >
                <option value="all">Tümü</option>
                <option value="active">Aktif Abonelik</option>
                <option value="expired">Süresi Dolmuş</option>
                <option value="none">Abonelik Yok</option>
                <option value="freeTrial">Free Trial</option>
              </select>
            </div>
          </div>
        </div>

        {/* Kullanıcı Tablosu */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kullanıcı
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Durum
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kayıt Tarihi
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    İşlemler
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan="5" className="px-4 py-8 text-center">
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                        <span className="ml-3 text-gray-600">Yükleniyor...</span>
                      </div>
                    </td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-4 py-8 text-center text-gray-500">
                      Kullanıcı bulunamadı
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {user.name} {user.surname}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">{getStatusBadge(user)}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(user.createdAt)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEdit(user)}
                            className="text-blue-600 hover:text-blue-900 p-2 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Düzenle"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(user)}
                            className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded-lg transition-colors"
                            title="Sil"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Düzenleme Modalı */}
        {showEditModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800">Kullanıcı Düzenle</h2>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ad</label>
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Soyad</label>
                    <input
                      type="text"
                      value={editForm.surname}
                      onChange={(e) => setEditForm({ ...editForm, surname: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={editForm.email}
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Abonelik Durumu</label>
                    <select
                      value={editForm.subscriptionStatus}
                      onChange={(e) => setEditForm({ ...editForm, subscriptionStatus: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="none">Yok</option>
                      <option value="active">Aktif</option>
                      <option value="expired">Süresi Dolmuş</option>
                    </select>
                  </div>
                  <div>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editForm.isSubscribed}
                        onChange={(e) => setEditForm({ ...editForm, isSubscribed: e.target.checked })}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm font-medium text-gray-700">Abonelik Aktif</span>
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Abonelik Tipi</label>
                    <select
                      value={editForm.subscriptionType}
                      onChange={(e) => setEditForm({ ...editForm, subscriptionType: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Seçiniz</option>
                      <option value="monthly">Aylık</option>
                      <option value="yearly">Yıllık</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Abonelik Başlangıç</label>
                    <input
                      type="date"
                      value={editForm.subscriptionStartDate}
                      onChange={(e) => setEditForm({ ...editForm, subscriptionStartDate: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Abonelik Bitiş</label>
                    <input
                      type="date"
                      value={editForm.subscriptionEndDate}
                      onChange={(e) => setEditForm({ ...editForm, subscriptionEndDate: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editForm.freeTrialStarted}
                        onChange={(e) => setEditForm({ ...editForm, freeTrialStarted: e.target.checked })}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm font-medium text-gray-700">Free Trial Başlatıldı</span>
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Free Trial Bitiş</label>
                    <input
                      type="date"
                      value={editForm.freeTrialEndDate}
                      onChange={(e) => setEditForm({ ...editForm, freeTrialEndDate: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
              <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  İptal
                </button>
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Kaydediliyor...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>Kaydet</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Silme Onay Modalı */}
        {showDeleteModal && userToDelete && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <AlertCircle className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">Kullanıcıyı Sil</h2>
                    <p className="text-sm text-gray-600">Bu işlem geri alınamaz</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-6">
                  <strong>{userToDelete.name} {userToDelete.surname}</strong> ({userToDelete.email}) adlı
                  kullanıcıyı silmek istediğinizden emin misiniz?
                </p>
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => {
                      setShowDeleteModal(false);
                      setUserToDelete(null);
                    }}
                    className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    İptal
                  </button>
                  <button
                    onClick={handleDeleteConfirm}
                    disabled={loading}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Siliniyor...</span>
                      </>
                    ) : (
                      <>
                        <Trash2 className="w-4 h-4" />
                        <span>Sil</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

