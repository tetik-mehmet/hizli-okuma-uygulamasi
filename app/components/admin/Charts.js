"use client";
import { useMemo } from "react";

export function UserGrowthChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-gray-500">
        Veri yok
      </div>
    );
  }

  const maxCount = Math.max(...data.map((d) => d.count), 1);

  return (
    <div className="h-64 flex items-end gap-1">
      {data.map((item, index) => {
        const height = (item.count / maxCount) * 100;
        return (
          <div
            key={index}
            className="flex-1 flex flex-col items-center gap-1 group"
          >
            <div
              className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t transition-all hover:from-blue-600 hover:to-blue-500 relative"
              style={{ height: `${Math.max(height, 5)}%` }}
            >
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                {item.count} kullanıcı
              </div>
            </div>
            <span className="text-xs text-gray-500 transform -rotate-45 origin-top-left whitespace-nowrap">
              {new Date(item.date).toLocaleDateString("tr-TR", {
                day: "2-digit",
                month: "2-digit",
              })}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export function SubscriptionDistributionChart({ data }) {
  if (!data) {
    return (
      <div className="h-64 flex items-center justify-center text-gray-500">
        Veri yok
      </div>
    );
  }

  const total =
    (data.monthly || 0) + (data.quarterly || 0) + (data.yearly || 0);

  if (total === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-gray-500">
        Abonelik yok
      </div>
    );
  }

  const monthlyPercent = ((data.monthly || 0) / total) * 100;
  const quarterlyPercent = ((data.quarterly || 0) / total) * 100;
  const yearlyPercent = ((data.yearly || 0) / total) * 100;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Aylık</span>
            <span className="text-sm font-bold text-blue-600">
              {data.monthly || 0} ({monthlyPercent.toFixed(1)}%)
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-blue-500 h-3 rounded-full transition-all"
              style={{ width: `${monthlyPercent}%` }}
            />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">3 Aylık</span>
            <span className="text-sm font-bold text-indigo-600">
              {data.quarterly || 0} ({quarterlyPercent.toFixed(1)}%)
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-indigo-500 h-3 rounded-full transition-all"
              style={{ width: `${quarterlyPercent}%` }}
            />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Yıllık</span>
            <span className="text-sm font-bold text-purple-600">
              {data.yearly || 0} ({yearlyPercent.toFixed(1)}%)
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-purple-500 h-3 rounded-full transition-all"
              style={{ width: `${yearlyPercent}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function MonthlyRevenueChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-gray-500">
        Veri yok
      </div>
    );
  }

  const maxRevenue = Math.max(...data.map((d) => d.revenue), 1);

  return (
    <div className="h-64 flex items-end gap-2">
      {data.map((item, index) => {
        const height = (item.revenue / maxRevenue) * 100;
        const monthName = new Date(item.month).toLocaleDateString("tr-TR", {
          month: "short",
        });
        return (
          <div
            key={index}
            className="flex-1 flex flex-col items-center gap-1 group"
          >
            <div
              className="w-full bg-gradient-to-t from-green-500 to-green-400 rounded-t transition-all hover:from-green-600 hover:to-green-500 relative"
              style={{ height: `${Math.max(height, 5)}%` }}
            >
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                {item.revenue.toLocaleString("tr-TR")}₺
                <br />
                {item.count} ödeme
              </div>
            </div>
            <span className="text-xs text-gray-500">{monthName}</span>
          </div>
        );
      })}
    </div>
  );
}

