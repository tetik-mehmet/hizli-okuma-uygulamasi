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
  Eye,
  Mail,
  User,
  Clock,
  Crown,
  FileText,
  Activity,
} from "lucide-react";
import {
  SubscriptionDistributionChart,
  MonthlyRevenueChart,
} from "@/app/components/admin/Charts";

export default function YonetimPaneli() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const limit = 50;
  const [selectedUser, setSelectedUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [userToView, setUserToView] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  // Log state'leri
  const [activeTab, setActiveTab] = useState("users"); // "users" veya "logs"
  const [logs, setLogs] = useState([]);
  const [logsLoading, setLogsLoading] = useState(false);
  const [logsPage, setLogsPage] = useState(1);
  const [logsTotalPages, setLogsTotalPages] = useState(1);
  const [logsTotal, setLogsTotal] = useState(0);
  const [logFilterAction, setLogFilterAction] = useState("all");
  const [showLogDetail, setShowLogDetail] = useState(false);
  const [selectedLog, setSelectedLog] = useState(null);
  const logsLimit = 50;

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

  // Arama veya filtre değiştiğinde kullanıcıları yeniden yükle (sayfa 1'e dön)
  useEffect(() => {
    if (isAdmin && activeTab === "users") {
      setCurrentPage(1);
      loadUsers(1);
    }
  }, [searchTerm, filterStatus, isAdmin, activeTab]);

  // Log filtresi değiştiğinde logları yeniden yükle
  useEffect(() => {
    if (isAdmin && activeTab === "logs") {
      setLogsPage(1);
      loadLogs(1);
    }
  }, [logFilterAction, isAdmin, activeTab]);

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
        setError(
          "Bu sayfaya erişim yetkiniz yok. Sadece admin kullanıcılar erişebilir."
        );
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

  const loadUsers = async (page = currentPage) => {
    try {
      setLoading(true);
      const authToken = localStorage.getItem("authToken");
      const params = new URLSearchParams();
      if (searchTerm) params.append("search", searchTerm);
      if (filterStatus !== "all")
        params.append("subscriptionStatus", filterStatus);
      params.append("page", page.toString());
      params.append("limit", limit.toString());

      const response = await fetch(`/api/admin/users?${params.toString()}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!response.ok) throw new Error("Kullanıcılar yüklenemedi");

      const data = await response.json();
      setUsers(data.users || []);
      if (data.pagination) {
        setTotalPages(data.pagination.totalPages || 1);
        setTotalUsers(data.pagination.total || 0);
        setCurrentPage(data.pagination.page || 1);
      }
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

  const loadLogs = async (page = logsPage) => {
    try {
      setLogsLoading(true);
      const authToken = localStorage.getItem("authToken");
      const params = new URLSearchParams();
      params.append("page", page.toString());
      params.append("limit", logsLimit.toString());
      if (logFilterAction !== "all") {
        params.append("action", logFilterAction);
      }

      const response = await fetch(`/api/admin/logs?${params.toString()}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!response.ok) throw new Error("Loglar yüklenemedi");

      const data = await response.json();
      setLogs(data.logs || []);
      if (data.pagination) {
        setLogsTotalPages(data.pagination.totalPages || 1);
        setLogsTotal(data.pagination.total || 0);
        setLogsPage(data.pagination.page || 1);
      }
    } catch (error) {
      console.error("Load logs error:", error);
      setError("Loglar yüklenirken bir hata oluştu.");
    } finally {
      setLogsLoading(false);
    }
  };

  // Abonelik tipine göre bitiş tarihini hesapla
  const calculateEndDate = (subscriptionType, startDate) => {
    if (!subscriptionType || !startDate) return "";

    const start = new Date(startDate);
    const end = new Date(start);

    switch (subscriptionType) {
      case "monthly":
        // 1 ay sonrası (gerçek ay hesabı)
        end.setMonth(end.getMonth() + 1);
        break;
      case "quarterly":
        // 3 ay sonrası
        end.setMonth(end.getMonth() + 3);
        break;
      case "yearly":
        // 1 yıl sonrası
        end.setFullYear(end.getFullYear() + 1);
        break;
      default:
        return "";
    }

    return end.toISOString().split("T")[0];
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

  const handleViewClick = (user) => {
    setUserToView(user);
    setShowViewModal(true);
    setError("");
  };

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
    setError("");
  };

  const handleBulkAction = (action) => async () => {
    if (selectedUsers.length === 0) {
      setError("Lütfen en az bir kullanıcı seçin.");
      return;
    }

    // Silme işlemi için onay iste
    if (action === "delete") {
      if (
        !confirm(
          `${selectedUsers.length} kullanıcıyı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.`
        )
      ) {
        return;
      }
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const authToken = localStorage.getItem("authToken");
      const response = await fetch("/api/admin/users/bulk", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          action,
          userIds: selectedUsers,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Toplu işlem başarısız");
      }

      const actionNames = {
        activate_subscription: "Abonelik aktifleştirme",
        cancel_subscription: "Abonelik iptali",
        delete: "Silme",
      };

      setSuccess(
        `${actionNames[action]} işlemi başarıyla tamamlandı: ${data.result.updated} kullanıcı güncellendi.`
      );
      setSelectedUsers([]);
      setSelectAll(false);
      await Promise.all([loadUsers(), loadStats()]);

      setTimeout(() => setSuccess(""), 5000);
    } catch (error) {
      console.error("Bulk action error:", error);
      setError(error.message || "Toplu işlem sırasında bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    try {
      const authToken = localStorage.getItem("authToken");
      const response = await fetch("/api/admin/users/export", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Export başarısız");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `kullanicilar_${new Date().toISOString().split("T")[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      setSuccess("Kullanıcı listesi başarıyla export edildi!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      console.error("Export error:", error);
      setError("Export sırasında bir hata oluştu.");
    }
  };

  const handleImport = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const authToken = localStorage.getItem("authToken");
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/admin/users/import", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Import başarısız");
      }

      setSuccess(
        `Import tamamlandı: ${data.imported} kullanıcı eklendi${
          data.errors > 0 ? `, ${data.errors} hata` : ""
        }`
      );
      if (data.errorDetails && data.errorDetails.length > 0) {
        console.warn("Import hataları:", data.errorDetails);
      }
      await Promise.all([loadUsers(), loadStats()]);
      setTimeout(() => setSuccess(""), 5000);
    } catch (error) {
      console.error("Import error:", error);
      setError(error.message || "Import sırasında bir hata oluştu.");
    } finally {
      setLoading(false);
      e.target.value = ""; // Reset file input
    }
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
    // Sadece abonelik durumuna göre badge göster (Free Trial kontrolü yok)
    if (user.subscriptionStatus === "active") {
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
    } else {
      return (
        <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
          Abonelik Yok
        </span>
      );
    }
  };

  // Kullanıcının aktiflik durumunu belirle (sadece subscriptionStatus'a göre)
  const getIsActiveStatus = (user) => {
    // Sadece abonelik durumuna göre kontrol et (Free Trial kontrolü yok)
    return user.subscriptionStatus === "active";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 font-inter flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 font-inter flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Erişim Reddedildi
          </h2>
          <p className="text-gray-600 mb-6">
            {error || "Bu sayfaya erişim yetkiniz yok."}
          </p>
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
              <p className="text-gray-600">
                Kullanıcıları yönetin ve sistem istatistiklerini görüntüleyin
              </p>
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

        {/* Tab Navigation */}
        <div className="mb-6 border-b border-gray-200">
          <div className="flex gap-4">
            <button
              onClick={() => {
                setActiveTab("users");
                if (activeTab === "logs") {
                  loadUsers();
                }
              }}
              className={`px-6 py-3 font-semibold text-sm border-b-2 transition-colors ${
                activeTab === "users"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-600 hover:text-gray-800"
              }`}
            >
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Kullanıcılar
              </div>
            </button>
            <button
              onClick={() => {
                setActiveTab("logs");
                if (activeTab === "users") {
                  loadLogs(1);
                }
              }}
              className={`px-6 py-3 font-semibold text-sm border-b-2 transition-colors ${
                activeTab === "logs"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-600 hover:text-gray-800"
              }`}
            >
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Sistem Logları
              </div>
            </button>
          </div>
        </div>

        {/* İstatistik Kartları - Sadece users tab'ında göster */}
        {activeTab === "users" && stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-6">
            <div className="bg-white rounded-xl shadow-md p-4">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 text-blue-600" />
                <span className="text-sm text-gray-600">Toplam Kullanıcı</span>
              </div>
              <p className="text-2xl font-bold text-gray-800">
                {stats.totalUsers}
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-4">
              <div className="flex items-center gap-2 mb-2">
                <UserCheck className="w-5 h-5 text-green-600" />
                <span className="text-sm text-gray-600">Aktif Abonelik</span>
              </div>
              <p className="text-2xl font-bold text-gray-800">
                {stats.activeSubscriptions}
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-4">
              <div className="flex items-center gap-2 mb-2">
                <UserX className="w-5 h-5 text-red-600" />
                <span className="text-sm text-gray-600">Süresi Dolmuş</span>
              </div>
              <p className="text-2xl font-bold text-gray-800">
                {stats.expiredSubscriptions}
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-4">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                <span className="text-sm text-gray-600">Free Trial</span>
              </div>
              <p className="text-2xl font-bold text-gray-800">
                {stats.activeFreeTrial}
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-purple-600" />
                <span className="text-sm text-gray-600">Son 7 Gün</span>
              </div>
              <p className="text-2xl font-bold text-gray-800">
                {stats.lastWeekUsers}
              </p>
            </div>
          </div>
        )}

        {/* Grafikler - Sadece users tab'ında göster */}
        {activeTab === "users" && stats && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Abonelik Dağılımı */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Crown className="w-5 h-5 text-purple-600" />
                Abonelik Dağılımı
              </h3>
              <SubscriptionDistributionChart
                data={stats.subscriptionDistribution}
              />
            </div>

            {/* Aylık Gelir */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                Aylık Gelir (Son 12 Ay)
              </h3>
              <MonthlyRevenueChart data={stats.monthlyRevenue} />
              {stats.totalRevenue && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600">Toplam Gelir</p>
                  <p className="text-2xl font-bold text-green-600">
                    {stats.totalRevenue.toLocaleString("tr-TR")}₺
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Kullanıcılar Tab İçeriği */}
        {activeTab === "users" && (
          <>
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
                <div className="flex gap-2">
                  <button
                    onClick={handleExport}
                    disabled={loading}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 text-sm font-medium flex items-center gap-2"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    Export CSV
                  </button>
                  <label className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 text-sm font-medium flex items-center gap-2 cursor-pointer">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    Import CSV
                    <input
                      type="file"
                      accept=".csv"
                      onChange={handleImport}
                      className="hidden"
                      disabled={loading}
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Toplu İşlemler Toolbar */}
            {selectedUsers.length > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-blue-800">
                    {selectedUsers.length} kullanıcı seçildi
                  </span>
                  <button
                    onClick={() => setSelectedUsers([])}
                    className="text-sm text-blue-600 hover:text-blue-800 underline"
                  >
                    Seçimi Temizle
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleBulkAction("activate_subscription")}
                    disabled={loading}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 text-sm"
                  >
                    Aboneliği Aktifleştir
                  </button>
                  <button
                    onClick={handleBulkAction("cancel_subscription")}
                    disabled={loading}
                    className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 text-sm"
                  >
                    Aboneliği İptal Et
                  </button>
                  <button
                    onClick={handleBulkAction("delete")}
                    disabled={loading}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 text-sm"
                  >
                    Sil
                  </button>
                </div>
              </div>
            )}

            {/* Kullanıcı Tablosu */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
                        <input
                          type="checkbox"
                          checked={selectAll}
                          onChange={(e) => {
                            setSelectAll(e.target.checked);
                            if (e.target.checked) {
                              setSelectedUsers(users.map((u) => u.id));
                            } else {
                              setSelectedUsers([]);
                            }
                          }}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </th>
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
                        <td colSpan="6" className="px-4 py-8 text-center">
                          <div className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                            <span className="ml-3 text-gray-600">
                              Yükleniyor...
                            </span>
                          </div>
                        </td>
                      </tr>
                    ) : users.length === 0 ? (
                      <tr>
                        <td
                          colSpan="6"
                          className="px-4 py-8 text-center text-gray-500"
                        >
                          Kullanıcı bulunamadı
                        </td>
                      </tr>
                    ) : (
                      users.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                          <td className="px-4 py-4 whitespace-nowrap">
                            <input
                              type="checkbox"
                              checked={selectedUsers.includes(user.id)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedUsers([...selectedUsers, user.id]);
                                } else {
                                  setSelectedUsers(
                                    selectedUsers.filter((id) => id !== user.id)
                                  );
                                  setSelectAll(false);
                                }
                              }}
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {user.name} {user.surname}
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">
                              {user.email}
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            {getStatusBadge(user)}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(user.createdAt)}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleViewClick(user)}
                                className="text-green-600 hover:text-green-900 p-2 hover:bg-green-50 rounded-lg transition-colors"
                                title="Görüntüle"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
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

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="bg-white px-4 py-3 border-t border-gray-200 flex items-center justify-between">
                  <div className="text-sm text-gray-700">
                    Toplam <span className="font-medium">{totalUsers}</span>{" "}
                    kullanıcıdan{" "}
                    <span className="font-medium">
                      {(currentPage - 1) * limit + 1}
                    </span>{" "}
                    -{" "}
                    <span className="font-medium">
                      {Math.min(currentPage * limit, totalUsers)}
                    </span>{" "}
                    arası gösteriliyor
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        if (currentPage > 1) {
                          const newPage = currentPage - 1;
                          setCurrentPage(newPage);
                          loadUsers(newPage);
                        }
                      }}
                      disabled={currentPage === 1 || loading}
                      className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Önceki
                    </button>
                    <div className="flex items-center gap-1">
                      {Array.from(
                        { length: Math.min(5, totalPages) },
                        (_, i) => {
                          let pageNum;
                          if (totalPages <= 5) {
                            pageNum = i + 1;
                          } else if (currentPage <= 3) {
                            pageNum = i + 1;
                          } else if (currentPage >= totalPages - 2) {
                            pageNum = totalPages - 4 + i;
                          } else {
                            pageNum = currentPage - 2 + i;
                          }
                          return (
                            <button
                              key={pageNum}
                              onClick={() => {
                                setCurrentPage(pageNum);
                                loadUsers(pageNum);
                              }}
                              disabled={loading}
                              className={`px-3 py-2 text-sm font-medium rounded-lg ${
                                currentPage === pageNum
                                  ? "bg-blue-600 text-white"
                                  : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
                              } disabled:opacity-50 disabled:cursor-not-allowed`}
                            >
                              {pageNum}
                            </button>
                          );
                        }
                      )}
                    </div>
                    <button
                      onClick={() => {
                        if (currentPage < totalPages) {
                          const newPage = currentPage + 1;
                          setCurrentPage(newPage);
                          loadUsers(newPage);
                        }
                      }}
                      disabled={currentPage === totalPages || loading}
                      className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Sonraki
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Düzenleme Modalı */}
            {showEditModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                  <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-800">
                      Kullanıcı Düzenle
                    </h2>
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
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Ad
                        </label>
                        <input
                          type="text"
                          value={editForm.name}
                          onChange={(e) =>
                            setEditForm({ ...editForm, name: e.target.value })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Soyad
                        </label>
                        <input
                          type="text"
                          value={editForm.surname}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              surname: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          value={editForm.email}
                          onChange={(e) =>
                            setEditForm({ ...editForm, email: e.target.value })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Abonelik Durumu
                        </label>
                        <select
                          value={editForm.subscriptionStatus}
                          onChange={(e) => {
                            const newStatus = e.target.value;
                            const updatedForm = {
                              ...editForm,
                              subscriptionStatus: newStatus,
                              // Abonelik durumuna göre isSubscribed'ı otomatik güncelle
                              isSubscribed: newStatus === "active",
                            };

                            // Eğer aktif yapılıyorsa ve başlangıç tarihi yoksa bugünü ayarla
                            if (
                              newStatus === "active" &&
                              !editForm.subscriptionStartDate
                            ) {
                              const today = new Date()
                                .toISOString()
                                .split("T")[0];
                              updatedForm.subscriptionStartDate = today;

                              // Eğer abonelik tipi varsa bitiş tarihini hesapla
                              if (editForm.subscriptionType) {
                                updatedForm.subscriptionEndDate =
                                  calculateEndDate(
                                    editForm.subscriptionType,
                                    today
                                  );
                              }
                            }

                            // Eğer expired veya none yapılıyorsa tarihleri temizle
                            if (
                              newStatus === "expired" ||
                              newStatus === "none"
                            ) {
                              if (!editForm.subscriptionStartDate) {
                                updatedForm.subscriptionStartDate = "";
                              }
                              if (!editForm.subscriptionEndDate) {
                                updatedForm.subscriptionEndDate = "";
                              }
                            }

                            setEditForm(updatedForm);
                          }}
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
                            onChange={(e) => {
                              const isSubscribed = e.target.checked;
                              const updatedForm = {
                                ...editForm,
                                isSubscribed,
                                // isSubscribed'a göre subscriptionStatus'u güncelle
                                subscriptionStatus: isSubscribed
                                  ? "active"
                                  : editForm.subscriptionStatus === "active"
                                  ? "none"
                                  : editForm.subscriptionStatus,
                              };

                              // Eğer abonelik aktif yapılıyorsa ve başlangıç tarihi yoksa bugünü ayarla
                              if (
                                isSubscribed &&
                                !editForm.subscriptionStartDate
                              ) {
                                const today = new Date()
                                  .toISOString()
                                  .split("T")[0];
                                updatedForm.subscriptionStartDate = today;

                                // Eğer abonelik tipi varsa bitiş tarihini hesapla
                                if (editForm.subscriptionType) {
                                  updatedForm.subscriptionEndDate =
                                    calculateEndDate(
                                      editForm.subscriptionType,
                                      today
                                    );
                                }
                              }

                              setEditForm(updatedForm);
                            }}
                            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                          />
                          <span className="text-sm font-medium text-gray-700">
                            Abonelik Aktif
                          </span>
                          <span className="text-xs text-gray-500 ml-2">
                            (Otomatik olarak durum güncellenir)
                          </span>
                        </label>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Abonelik Tipi
                        </label>
                        <select
                          value={editForm.subscriptionType}
                          onChange={(e) => {
                            const subscriptionType = e.target.value;
                            const updatedForm = {
                              ...editForm,
                              subscriptionType,
                            };

                            // Eğer abonelik tipi seçildiyse ve başlangıç tarihi varsa bitiş tarihini hesapla
                            if (
                              subscriptionType &&
                              editForm.subscriptionStartDate
                            ) {
                              updatedForm.subscriptionEndDate =
                                calculateEndDate(
                                  subscriptionType,
                                  editForm.subscriptionStartDate
                                );
                            } else if (
                              subscriptionType &&
                              editForm.subscriptionStatus === "active"
                            ) {
                              // Eğer aktifse ama başlangıç tarihi yoksa bugünü ayarla
                              const today = new Date()
                                .toISOString()
                                .split("T")[0];
                              updatedForm.subscriptionStartDate = today;
                              updatedForm.subscriptionEndDate =
                                calculateEndDate(subscriptionType, today);
                            }

                            setEditForm(updatedForm);
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Seçiniz</option>
                          <option value="monthly">Aylık</option>
                          <option value="quarterly">3 Aylık</option>
                          <option value="yearly">Yıllık</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Abonelik Başlangıç
                        </label>
                        <input
                          type="date"
                          value={editForm.subscriptionStartDate}
                          onChange={(e) => {
                            const startDate = e.target.value;
                            const updatedForm = {
                              ...editForm,
                              subscriptionStartDate: startDate,
                            };

                            // Eğer abonelik tipi varsa bitiş tarihini hesapla
                            if (startDate && editForm.subscriptionType) {
                              updatedForm.subscriptionEndDate =
                                calculateEndDate(
                                  editForm.subscriptionType,
                                  startDate
                                );
                            }

                            setEditForm(updatedForm);
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Abonelik Bitiş
                        </label>
                        <input
                          type="date"
                          value={editForm.subscriptionEndDate}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              subscriptionEndDate: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {editForm.subscriptionType &&
                          editForm.subscriptionStartDate && (
                            <p className="text-xs text-gray-500 mt-1">
                              Otomatik hesaplanan bitiş tarihi:{" "}
                              {calculateEndDate(
                                editForm.subscriptionType,
                                editForm.subscriptionStartDate
                              )}
                            </p>
                          )}
                      </div>
                      <div>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={editForm.freeTrialStarted}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                freeTrialStarted: e.target.checked,
                              })
                            }
                            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                          />
                          <span className="text-sm font-medium text-gray-700">
                            Free Trial Başlatıldı
                          </span>
                        </label>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Free Trial Bitiş
                        </label>
                        <input
                          type="date"
                          value={editForm.freeTrialEndDate}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              freeTrialEndDate: e.target.value,
                            })
                          }
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
                        <h2 className="text-xl font-bold text-gray-800">
                          Kullanıcıyı Sil
                        </h2>
                        <p className="text-sm text-gray-600">
                          Bu işlem geri alınamaz
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-6">
                      <strong>
                        {userToDelete.name} {userToDelete.surname}
                      </strong>{" "}
                      ({userToDelete.email}) adlı kullanıcıyı silmek
                      istediğinizden emin misiniz?
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

            {/* Kullanıcı Bilgileri Görüntüleme Modalı */}
            {showViewModal && userToView && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                  <div className="sticky top-0 bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-4 flex items-center justify-between rounded-t-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                        <Eye className="w-5 h-5 text-white" />
                      </div>
                      <h2 className="text-xl font-bold text-white">
                        Kullanıcı Bilgileri
                      </h2>
                    </div>
                    <button
                      onClick={() => {
                        setShowViewModal(false);
                        setUserToView(null);
                      }}
                      className="text-white hover:text-gray-200 transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="p-6">
                    {/* Kullanıcı Profil Kartı */}
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 mb-6 border border-blue-100">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                          {userToView.name?.[0]?.toUpperCase()}
                          {userToView.surname?.[0]?.toUpperCase()}
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-800">
                            {userToView.name} {userToView.surname}
                          </h3>
                          <p className="text-gray-600 flex items-center gap-2 mt-1">
                            <Mail className="w-4 h-4" />
                            {userToView.email}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>
                          Kayıt Tarihi: {formatDate(userToView.createdAt)}
                        </span>
                      </div>
                    </div>

                    {/* Abonelik Bilgileri */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Crown className="w-5 h-5 text-blue-600" />
                          </div>
                          <h4 className="font-semibold text-gray-800">
                            Abonelik Durumu
                          </h4>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">
                              Durum:
                            </span>
                            <span>{getStatusBadge(userToView)}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">
                              Aktif:
                            </span>
                            <span
                              className={`text-sm font-medium ${
                                getIsActiveStatus(userToView)
                                  ? "text-green-600"
                                  : "text-gray-500"
                              }`}
                            >
                              {getIsActiveStatus(userToView) ? "Evet" : "Hayır"}
                            </span>
                          </div>
                          {userToView.subscriptionType && (
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">
                                Tip:
                              </span>
                              <span className="text-sm font-medium text-gray-800">
                                {userToView.subscriptionType === "monthly"
                                  ? "Aylık"
                                  : userToView.subscriptionType === "quarterly"
                                  ? "3 Aylık"
                                  : userToView.subscriptionType === "yearly"
                                  ? "Yıllık"
                                  : userToView.subscriptionType}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                            <Calendar className="w-5 h-5 text-purple-600" />
                          </div>
                          <h4 className="font-semibold text-gray-800">
                            Tarih Bilgileri
                          </h4>
                        </div>
                        <div className="space-y-2">
                          {userToView.subscriptionStartDate && (
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">
                                Başlangıç:
                              </span>
                              <span className="text-sm font-medium text-gray-800">
                                {formatDate(userToView.subscriptionStartDate)}
                              </span>
                            </div>
                          )}
                          {userToView.subscriptionEndDate && (
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">
                                Bitiş:
                              </span>
                              <span className="text-sm font-medium text-gray-800">
                                {formatDate(userToView.subscriptionEndDate)}
                              </span>
                            </div>
                          )}
                          {userToView.freeTrialEndDate && (
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">
                                Free Trial Bitiş:
                              </span>
                              <span className="text-sm font-medium text-gray-800">
                                {formatDate(userToView.freeTrialEndDate)}
                              </span>
                            </div>
                          )}
                          {!userToView.subscriptionStartDate &&
                            !userToView.subscriptionEndDate &&
                            !userToView.freeTrialEndDate && (
                              <span className="text-sm text-gray-500">
                                Tarih bilgisi yok
                              </span>
                            )}
                        </div>
                      </div>
                    </div>

                    {/* Free Trial Bilgisi */}
                    {userToView.freeTrialStarted && (
                      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-5 mb-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                            <Clock className="w-5 h-5 text-yellow-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800">
                              Ücretsiz Deneme
                            </h4>
                            <p className="text-sm text-gray-600">
                              Free Trial başlatılmış
                              {userToView.freeTrialEndDate &&
                                ` - Bitiş: ${formatDate(
                                  userToView.freeTrialEndDate
                                )}`}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Özet Bilgiler */}
                    <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                      <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <User className="w-5 h-5 text-gray-600" />
                        Özet Bilgiler
                      </h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Kullanıcı ID:</span>
                          <span className="ml-2 font-mono text-gray-800">
                            {userToView.id}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600">
                            Abonelik Durumu:
                          </span>
                          <span className="ml-2 font-medium text-gray-800">
                            {userToView.subscriptionStatus || "none"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Modal Footer */}
                  <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end gap-3 rounded-b-xl">
                    <button
                      onClick={() => {
                        setShowViewModal(false);
                        setUserToView(null);
                      }}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      Kapat
                    </button>
                    <button
                      onClick={() => {
                        setShowViewModal(false);
                        setUserToView(null);
                        handleEdit(userToView);
                      }}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                      <Edit className="w-4 h-4" />
                      Düzenle
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* Sistem Logları Tab İçeriği */}
        {activeTab === "logs" && (
          <>
            {/* Log Filtreleri */}
            <div className="bg-white rounded-xl shadow-md p-4 mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    value={logFilterAction}
                    onChange={(e) => {
                      setLogFilterAction(e.target.value);
                      setLogsPage(1);
                      loadLogs(1);
                    }}
                    className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                  >
                    <option value="all">Tüm İşlemler</option>
                    <option value="login">Giriş</option>
                    <option value="logout">Çıkış</option>
                    <option value="signup">Kayıt</option>
                    <option value="subscription_purchase">
                      Abonelik Satın Alma
                    </option>
                    <option value="subscription_update">
                      Abonelik Güncelleme
                    </option>
                    <option value="free_trial_start">
                      Free Trial Başlatma
                    </option>
                    <option value="admin_action">Admin İşlemleri</option>
                    <option value="error">Hatalar</option>
                  </select>
                </div>
                <div className="flex-1 text-sm text-gray-600 flex items-center">
                  Toplam{" "}
                  <span className="font-bold text-gray-800 mx-1">
                    {logsTotal}
                  </span>{" "}
                  log kaydı
                </div>
              </div>
            </div>

            {/* Log Tablosu */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tarih/Saat
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        İşlem
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Kullanıcı
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Açıklama
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        IP Adresi
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        İşlemler
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {logsLoading ? (
                      <tr>
                        <td colSpan="6" className="px-4 py-8 text-center">
                          <div className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                            <span className="ml-3 text-gray-600">
                              Yükleniyor...
                            </span>
                          </div>
                        </td>
                      </tr>
                    ) : logs.length === 0 ? (
                      <tr>
                        <td
                          colSpan="6"
                          className="px-4 py-8 text-center text-gray-500"
                        >
                          Log kaydı bulunamadı
                        </td>
                      </tr>
                    ) : (
                      logs.map((log) => (
                        <tr key={log.id} className="hover:bg-gray-50">
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(log.createdAt).toLocaleString("tr-TR", {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                log.action === "login"
                                  ? "bg-green-100 text-green-800"
                                  : log.action === "subscription_purchase"
                                  ? "bg-blue-100 text-blue-800"
                                  : log.action === "admin_action"
                                  ? "bg-purple-100 text-purple-800"
                                  : log.action === "error"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {log.action === "login"
                                ? "Giriş"
                                : log.action === "logout"
                                ? "Çıkış"
                                : log.action === "signup"
                                ? "Kayıt"
                                : log.action === "subscription_purchase"
                                ? "Abonelik"
                                : log.action === "subscription_update"
                                ? "Güncelleme"
                                : log.action === "free_trial_start"
                                ? "Free Trial"
                                : log.action === "admin_action"
                                ? "Admin"
                                : log.action === "error"
                                ? "Hata"
                                : log.action}
                            </span>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="text-sm">
                              {log.userName && log.userSurname ? (
                                <>
                                  <div className="font-medium text-gray-900">
                                    {log.userName} {log.userSurname}
                                  </div>
                                  <div className="text-gray-500 text-xs">
                                    {log.userEmail}
                                  </div>
                                </>
                              ) : log.userEmail ? (
                                <div className="text-gray-900">
                                  {log.userEmail}
                                </div>
                              ) : (
                                <div className="text-gray-400">-</div>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="text-sm text-gray-900 max-w-md truncate">
                              {log.description}
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                            {log.ipAddress || "-"}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              onClick={() => {
                                setSelectedLog(log);
                                setShowLogDetail(true);
                              }}
                              className="text-blue-600 hover:text-blue-900 p-2 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Detayları Görüntüle"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Log Pagination */}
              {logsTotalPages > 1 && (
                <div className="bg-white px-4 py-3 border-t border-gray-200 flex items-center justify-between">
                  <div className="text-sm text-gray-700">
                    Toplam <span className="font-medium">{logsTotal}</span>{" "}
                    logdan{" "}
                    <span className="font-medium">
                      {(logsPage - 1) * logsLimit + 1}
                    </span>{" "}
                    -{" "}
                    <span className="font-medium">
                      {Math.min(logsPage * logsLimit, logsTotal)}
                    </span>{" "}
                    arası gösteriliyor
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        if (logsPage > 1) {
                          const newPage = logsPage - 1;
                          setLogsPage(newPage);
                          loadLogs(newPage);
                        }
                      }}
                      disabled={logsPage === 1 || logsLoading}
                      className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Önceki
                    </button>
                    <div className="flex items-center gap-1">
                      {Array.from(
                        { length: Math.min(5, logsTotalPages) },
                        (_, i) => {
                          let pageNum;
                          if (logsTotalPages <= 5) {
                            pageNum = i + 1;
                          } else if (logsPage <= 3) {
                            pageNum = i + 1;
                          } else if (logsPage >= logsTotalPages - 2) {
                            pageNum = logsTotalPages - 4 + i;
                          } else {
                            pageNum = logsPage - 2 + i;
                          }
                          return (
                            <button
                              key={pageNum}
                              onClick={() => {
                                setLogsPage(pageNum);
                                loadLogs(pageNum);
                              }}
                              disabled={logsLoading}
                              className={`px-3 py-2 text-sm font-medium rounded-lg ${
                                logsPage === pageNum
                                  ? "bg-blue-600 text-white"
                                  : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
                              } disabled:opacity-50 disabled:cursor-not-allowed`}
                            >
                              {pageNum}
                            </button>
                          );
                        }
                      )}
                    </div>
                    <button
                      onClick={() => {
                        if (logsPage < logsTotalPages) {
                          const newPage = logsPage + 1;
                          setLogsPage(newPage);
                          loadLogs(newPage);
                        }
                      }}
                      disabled={logsPage === logsTotalPages || logsLoading}
                      className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Sonraki
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Log Detay Modalı */}
            {showLogDetail && selectedLog && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                  <div className="sticky top-0 bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-4 flex items-center justify-between rounded-t-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                        <FileText className="w-5 h-5 text-white" />
                      </div>
                      <h2 className="text-xl font-bold text-white">
                        Log Detayları
                      </h2>
                    </div>
                    <button
                      onClick={() => {
                        setShowLogDetail(false);
                        setSelectedLog(null);
                      }}
                      className="text-white hover:text-gray-200 transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-semibold text-gray-600">
                          Tarih/Saat
                        </label>
                        <p className="text-gray-900 mt-1">
                          {new Date(selectedLog.createdAt).toLocaleString(
                            "tr-TR",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                              second: "2-digit",
                            }
                          )}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-gray-600">
                          İşlem Tipi
                        </label>
                        <p className="mt-1">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              selectedLog.action === "login"
                                ? "bg-green-100 text-green-800"
                                : selectedLog.action === "subscription_purchase"
                                ? "bg-blue-100 text-blue-800"
                                : selectedLog.action === "admin_action"
                                ? "bg-purple-100 text-purple-800"
                                : selectedLog.action === "error"
                                ? "bg-red-100 text-red-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {selectedLog.action}
                          </span>
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-gray-600">
                          Kullanıcı
                        </label>
                        <p className="text-gray-900 mt-1">
                          {selectedLog.userName && selectedLog.userSurname
                            ? `${selectedLog.userName} ${selectedLog.userSurname}`
                            : selectedLog.userEmail || "-"}
                        </p>
                        {selectedLog.userEmail && (
                          <p className="text-sm text-gray-500 mt-1">
                            {selectedLog.userEmail}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-gray-600">
                          IP Adresi
                        </label>
                        <p className="text-gray-900 mt-1 font-mono text-sm">
                          {selectedLog.ipAddress || "-"}
                        </p>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-gray-600">
                        Açıklama
                      </label>
                      <p className="text-gray-900 mt-1">
                        {selectedLog.description}
                      </p>
                    </div>

                    {selectedLog.userAgent && (
                      <div>
                        <label className="text-sm font-semibold text-gray-600">
                          User Agent
                        </label>
                        <p className="text-gray-900 mt-1 text-sm font-mono break-all">
                          {selectedLog.userAgent}
                        </p>
                      </div>
                    )}

                    {selectedLog.metadata &&
                      Object.keys(selectedLog.metadata).length > 0 && (
                        <div>
                          <label className="text-sm font-semibold text-gray-600">
                            Metadata
                          </label>
                          <pre className="mt-1 p-3 bg-gray-50 rounded-lg text-sm overflow-x-auto">
                            {JSON.stringify(selectedLog.metadata, null, 2)}
                          </pre>
                        </div>
                      )}

                    {selectedLog.userId && (
                      <div>
                        <label className="text-sm font-semibold text-gray-600">
                          Kullanıcı ID
                        </label>
                        <p className="text-gray-900 mt-1 font-mono text-sm">
                          {selectedLog.userId}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end gap-3 rounded-b-xl">
                    <button
                      onClick={() => {
                        setShowLogDetail(false);
                        setSelectedLog(null);
                      }}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      Kapat
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
