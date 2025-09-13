"use client";

import React, { useState } from "react";
import { 
  TrendingUp, 
  TrendingDown, 
  Phone, 
  Calendar, 
  Users, 
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
  Star,
  MessageSquare,
  Target,
  Zap,
  Search,
  Bell,
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sidebar } from "./sidebar";

const kpiData = [
  {
    title: "Всего звонков",
    value: "1,247",
    change: "+12%",
    trend: "up",
    icon: Phone,
    color: "blue"
  },
  {
    title: "Конверсия",
    value: "68%",
    change: "+5%",
    trend: "up", 
    icon: Target,
    color: "green"
  },
  {
    title: "Доход",
    value: "₽2,847,000",
    change: "+18%",
    trend: "up",
    icon: DollarSign,
    color: "purple"
  },
  {
    title: "Активные лиды",
    value: "342",
    change: "-3%",
    trend: "down",
    icon: Users,
    color: "orange"
  }
];

const recentActivities = [
  {
    id: 1,
    type: "call",
    title: "Звонок от Иван Петров",
    description: "Обсуждение проекта автоматизации",
    time: "2 минуты назад",
    status: "completed"
  },
  {
    id: 2,
    type: "meeting",
    title: "Встреча с ООО \"Техносфера\"",
    description: "Презентация решения",
    time: "1 час назад",
    status: "scheduled"
  },
  {
    id: 3,
    type: "task",
    title: "Подготовить коммерческое предложение",
    description: "Для клиента \"Альфа Строй\"",
    time: "3 часа назад",
    status: "in-progress"
  },
  {
    id: 4,
    type: "call",
    title: "Входящий звонок",
    description: "Новый лид из рекламы",
    time: "5 часов назад",
    status: "missed"
  }
];

const quickActions = [
  { id: "new-call", label: "Новый звонок", icon: Phone, color: "blue" },
  { id: "schedule-meeting", label: "Запланировать встречу", icon: Calendar, color: "green" },
  { id: "add-contact", label: "Добавить контакт", icon: Users, color: "purple" },
  { id: "create-task", label: "Создать задачу", icon: Target, color: "orange" }
];

const upcomingEvents = [
  {
    id: 1,
    title: "Звонок с ООО \"Инновации\"",
    time: "14:30",
    type: "call",
    priority: "high"
  },
  {
    id: 2,
    title: "Встреча с отделом продаж",
    time: "16:00",
    type: "meeting",
    priority: "medium"
  },
  {
    id: 3,
    title: "Демо для нового клиента",
    time: "17:30",
    type: "demo",
    priority: "high"
  }
];

const aiInsights = [
  {
    id: 1,
    title: "Рекомендация по лиду",
    description: "Клиент \"Техно Плюс\" готов к повторному звонку",
    confidence: 85,
    action: "Позвонить сегодня"
  },
  {
    id: 2,
    title: "Анализ конверсии",
    description: "Лучшее время для звонков: 10:00-12:00",
    confidence: 92,
    action: "Оптимизировать расписание"
  }
];

export function CRMDemo() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedQuickAction, setSelectedQuickAction] = useState<string | null>(null);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "call": return Phone;
      case "meeting": return Calendar;
      case "task": return Target;
      default: return MessageSquare;
    }
  };

  const getActivityColor = (status: string) => {
    switch (status) {
      case "completed": return "text-green-600 bg-green-100";
      case "scheduled": return "text-blue-600 bg-blue-100";
      case "in-progress": return "text-orange-600 bg-orange-100";
      case "missed": return "text-red-600 bg-red-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg bg-${kpi.color}-100 flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 text-${kpi.color}-600`} />
                </div>
                <div className={`flex items-center gap-1 text-sm ${
                  kpi.trend === "up" ? "text-green-600" : "text-red-600"
                }`}>
                  {kpi.trend === "up" ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  {kpi.change}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{kpi.value}</h3>
              <p className="text-gray-600 text-sm">{kpi.title}</p>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Быстрые действия</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Button
                key={action.id}
                variant="outline"
                className={`h-20 flex flex-col items-center gap-2 hover:scale-105 transition-transform ${
                  selectedQuickAction === action.id ? "ring-2 ring-blue-500" : ""
                }`}
                onClick={() => setSelectedQuickAction(selectedQuickAction === action.id ? null : action.id)}
              >
                <Icon className={`w-6 h-6 text-${action.color}-600`} />
                <span className="text-xs text-center">{action.label}</span>
              </Button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Последние активности</h3>
          <div className="space-y-4">
            {recentActivities.map((activity) => {
              const Icon = getActivityIcon(activity.type);
              return (
                <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getActivityColor(activity.status)}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 text-sm">{activity.title}</p>
                    <p className="text-gray-600 text-xs">{activity.description}</p>
                    <p className="text-gray-400 text-xs mt-1">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Предстоящие события</h3>
          <div className="space-y-3">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 text-sm">{event.title}</p>
                  <p className="text-gray-600 text-xs">{event.time}</p>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs ${
                  event.priority === "high" ? "bg-red-100 text-red-600" : "bg-yellow-100 text-yellow-600"
                }`}>
                  {event.priority === "high" ? "Высокий" : "Средний"}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-purple-600" />
          AI Инсайты
        </h3>
        <div className="space-y-4">
          {aiInsights.map((insight) => (
            <div key={insight.id} className="bg-white rounded-lg p-4 border border-purple-200">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-gray-900">{insight.title}</h4>
                <div className="flex items-center gap-1 text-sm text-purple-600">
                  <Star className="w-4 h-4" />
                  {insight.confidence}%
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-3">{insight.description}</p>
              <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                {insight.action}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return renderDashboard();
      case "contacts":
        return (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h2 className="text-2xl font-bold mb-4">Контакты</h2>
            <p className="text-gray-600">Здесь будет список всех контактов с возможностью поиска и фильтрации.</p>
          </div>
        );
      case "calls":
        return (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h2 className="text-2xl font-bold mb-4">История звонков</h2>
            <p className="text-gray-600">Здесь будет история всех звонков с записями и аналитикой.</p>
          </div>
        );
      case "calendar":
        return (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h2 className="text-2xl font-bold mb-4">Календарь</h2>
            <p className="text-gray-600">Здесь будет календарь с запланированными встречами и звонками.</p>
          </div>
        );
      case "analytics":
        return (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h2 className="text-2xl font-bold mb-4">Аналитика</h2>
            <p className="text-gray-600">Здесь будут графики и отчеты по продажам и активности.</p>
          </div>
        );
      default:
        return (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h2 className="text-2xl font-bold mb-4">Раздел в разработке</h2>
            <p className="text-gray-600">Этот раздел находится в разработке.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-full bg-gray-50">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {activeTab === "dashboard" ? "Дашборд" : 
                 activeTab === "contacts" ? "Контакты" :
                 activeTab === "calls" ? "Звонки" :
                 activeTab === "calendar" ? "Календарь" :
                 activeTab === "analytics" ? "Аналитика" : "CRM"}
              </h1>
              <p className="text-gray-600">Добро пожаловать в AI Call Assistant CRM</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Поиск..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </Button>
              
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">AI</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}