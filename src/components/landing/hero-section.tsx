"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Phone, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Phone3DBackground } from "@/components/ui/phone-3d-model";
import { RegistrationModal } from "@/components/ui/registration-modal";
import { DemoModal } from "@/components/ui/demo-modal";

export function HeroSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenDemoModal = () => {
    setIsDemoModalOpen(true);
  };

  const handleCloseDemoModal = () => {
    setIsDemoModalOpen(false);
  };

  return (
    <section className="min-h-screen text-white relative overflow-hidden">
      {/* 3D Phone Background */}
      <Phone3DBackground className="opacity-80" />

      {/* Volkov AI Agency Branding */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="absolute top-4 sm:top-8 left-1/2 transform -translate-x-1/2 z-10 px-4"
      >
        <div className="glass-card-dark px-3 sm:px-6 py-2 sm:py-3">
          <p className="text-xs sm:text-sm text-gray-300 font-medium text-center">
            Разработано командой <span className="text-gradient font-semibold">Volkov AI Agency</span>
          </p>
        </div>
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 pt-20 sm:pt-32 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[80vh]">
          {/* Left side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 sm:space-y-8 lg:-ml-8 text-center lg:text-left"
          >
            {/* Мобильная версия заголовка */}
            <motion.h1 
              className="block sm:hidden text-5xl md:text-6xl font-bold leading-tight text-center mt-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Перестаньте{" "}
              <span className="text-red-500 smooth-bounce" style={{ display: 'inline-block' }}>терять звонки</span>
            </motion.h1>

            {/* Десктопная версия заголовка */}
            <motion.h1 
              className="hidden sm:block text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Перестаньте{" "}
              <span className="text-red-500 smooth-bounce" style={{ display: 'inline-block' }}>терять звонки</span>.
            </motion.h1>

            <motion.p 
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-2xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Наша CRM система работает с ИИ агентом, который 24/7 отвечает на каждый звонок, записывает их в ваш календарь, ставит новые задачи и направляет уведомления в телеграм или другой удобный мессенджер. Будущее уже сегодня.
            </motion.p>

            <motion.div 
              className="flex flex-col gap-3 sm:gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Button
                size="lg"
                onClick={handleOpenModal}
                className="apple-button text-black text-sm sm:text-base lg:text-lg font-semibold px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto"
              >
                Записаться на закрытое тестирование
                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
              <Button
                size="lg"
                onClick={handleOpenDemoModal}
                className="bg-black text-blue-400 text-sm sm:text-base lg:text-lg font-semibold px-6 sm:px-8 py-3 sm:py-4 border border-blue-400 hover:bg-gray-900 transition-colors w-full sm:w-auto"
              >
                Посмотреть демо
              </Button>
            </motion.div>

            {/* Enhanced Trust indicators */}
            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-6 pt-6 sm:pt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="flex items-center gap-2 glass-card-dark px-3 sm:px-4 py-2 rounded-full">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                <span className="text-gray-300 text-sm sm:text-base">Без кредитной карты</span>
              </div>
              <div className="flex items-center gap-2 glass-card-dark px-3 sm:px-4 py-2 rounded-full">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                <span className="text-gray-300 text-sm sm:text-base">Настройка за 5 минут</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right side - Enhanced Animation */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative mt-8 lg:mt-0"
          >
            <div className="apple-card-dark p-4 sm:p-6 lg:p-8">
              <motion.h3 
                className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-center text-gradient"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
              >
                Как это работает
              </motion.h3>
              
              {/* Enhanced Animation steps */}
              <div className="space-y-4 sm:space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                  className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 glass-card rounded-xl hover:scale-105 transition-transform duration-300"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                    <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-white text-sm sm:text-base">Входящий звонок</p>
                    <p className="text-xs sm:text-sm text-gray-400">ИИ отвечает мгновенно</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1.4 }}
                  className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 glass-card-calendar-opaque rounded-xl hover:scale-105 transition-transform duration-300"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                    <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-white text-sm sm:text-base">Запись в календарь</p>
                    <p className="text-xs sm:text-sm text-gray-400">Автоматическое бронирование</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1.6 }}
                  className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 glass-card rounded-xl hover:scale-105 transition-transform duration-300"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-white text-sm sm:text-base">Лид сохранен</p>
                    <p className="text-xs sm:text-sm text-gray-400">Никто не потерян</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Registration Modal */}
      <RegistrationModal isOpen={isModalOpen} onClose={handleCloseModal} />
      
      {/* Demo Modal */}
      <DemoModal isOpen={isDemoModalOpen} onClose={handleCloseDemoModal} />
    </section>
  );
}