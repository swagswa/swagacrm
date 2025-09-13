"use client";

import React from "react";
import { 
  Home, 
  Users, 
  Phone, 
  Calendar, 
  BarChart3, 
  Settings, 
  MessageSquare,
  Target,
  FileText,
  Bell
} from "lucide-react";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const menuItems = [
  { id: "dashboard", label: "Дашборд", icon: Home },
  { id: "contacts", label: "Контакты", icon: Users },
  { id: "calls", label: "Звонки", icon: Phone },
  { id: "calendar", label: "Календарь", icon: Calendar },
  { id: "analytics", label: "Аналитика", icon: BarChart3 },
  { id: "tasks", label: "Задачи", icon: Target },
  { id: "messages", label: "Сообщения", icon: MessageSquare },
  { id: "reports", label: "Отчеты", icon: FileText },
  { id: "notifications", label: "Уведомления", icon: Bell },
  { id: "settings", label: "Настройки", icon: Settings },
];

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <div className="w-64 bg-gray-900 border-r border-gray-700 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-700">
        <h2 className="text-xl font-bold text-white">AI CRM</h2>
        <p className="text-sm text-gray-400">Демо версия</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* User info */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-sm font-semibold text-white">AI</span>
          </div>
          <div>
            <p className="text-sm font-medium text-white">AI Агент</p>
            <p className="text-xs text-gray-400">Онлайн</p>
          </div>
        </div>
      </div>
    </div>
  );
}