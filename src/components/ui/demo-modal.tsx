"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Maximize2, Minimize2, ExternalLink } from "lucide-react";

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DemoModal({ isOpen, onClose }: DemoModalProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [crmUrl, setCrmUrl] = useState<string | null>(null);

  useEffect(() => {
    // Проверяем, запущена ли CRM система на портах 3002, 3000 или 3001
    const checkCrmServer = async () => {
      const ports = [3002, 3000, 3001]; // Проверяем сначала 3002, потом 3000, потом 3001
      
      for (const port of ports) {
        try {
          const response = await fetch(`http://localhost:${port}`);
          if (response.ok) {
            const text = await response.text();
            // Проверяем, что это именно CRM система, а не лендинг
            // Ищем специфические элементы CRM
            const hasCrmSystem = text.includes('CRM System') || text.includes('AI-Powered CRM');
            const hasDashboard = text.includes('Dashboard') || text.includes('Дашборд');
            const hasContacts = text.includes('Contacts') || text.includes('Контакты');
            const hasTasks = text.includes('Tasks') || text.includes('Задачи');
            const hasCalendar = text.includes('Calendar') || text.includes('Календарь');
            
            const isCrm = hasCrmSystem && hasDashboard && hasContacts && (hasTasks || hasCalendar);
            
            // Исключаем лендинг (он содержит "Записаться на закрытое тестирование")
            const isLanding = text.includes('Записаться на закрытое тестирование') || 
                             text.includes('Посмотреть демо') ||
                             text.includes('Как это работает') ||
                             text.includes('Почему выбирают нашу CRM-систему');
            
            if (isCrm && !isLanding) {
              setCrmUrl(`http://localhost:${port}`);
              return;
            }
          }
        } catch (error) {
          console.log(`CRM система не запущена на порту ${port}`);
        }
      }
      setCrmUrl(null);
    };

    if (isOpen) {
      checkCrmServer();
    }
  }, [isOpen]);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const startCrmSystem = () => {
    // Открываем новое окно с инструкциями
    const instructions = `
Для запуска CRM системы:

1. Откройте терминал
2. Перейдите в папку: cd e:\\landinggg\\swaga
3. Установите зависимости: npm install
4. Запустите систему: npm run dev

CRM система будет доступна на http://localhost:3002, http://localhost:3000 или http://localhost:3001
    `;
    alert(instructions);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              width: isFullscreen ? "100vw" : "90vw",
              height: isFullscreen ? "100vh" : "85vh",
              maxWidth: isFullscreen ? "none" : "1400px",
              maxHeight: isFullscreen ? "none" : "900px"
            }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={`fixed z-50 bg-white rounded-lg shadow-2xl overflow-hidden ${
              isFullscreen 
                ? "top-0 left-0 rounded-none" 
                : "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <h2 className="text-lg font-semibold text-gray-900">
                  AI Call Assistant CRM - Демо версия
                </h2>
              </div>
              
              <div className="flex items-center gap-2">
                {crmUrl && (
                  <button
                    onClick={() => window.open(crmUrl, '_blank')}
                    className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Открыть в новом окне"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={toggleFullscreen}
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  {isFullscreen ? (
                    <Minimize2 className="w-4 h-4" />
                  ) : (
                    <Maximize2 className="w-4 h-4" />
                  )}
                </button>
                <button
                  onClick={onClose}
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Demo Content */}
            <div className="h-full overflow-hidden">
              {crmUrl ? (
                <iframe
                  src={crmUrl}
                  className="w-full h-full border-0"
                  title="CRM Demo"
                  sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                  <div className="max-w-md">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      CRM система не запущена
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Для просмотра демо необходимо запустить CRM систему из папки swaga
                    </p>
                    <button
                      onClick={startCrmSystem}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Показать инструкции по запуску
                    </button>
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg text-left">
                      <h4 className="font-semibold text-gray-900 mb-2">Быстрый запуск:</h4>
                      <code className="text-sm text-gray-700 block">
                        cd e:\landinggg\swaga<br/>
                        npm install<br/>
                        npm run dev
                      </code>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}