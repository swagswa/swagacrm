"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Clock, 
  Calendar, 
  MessageSquare, 
  BarChart3, 
  Shield, 
  Zap
} from "lucide-react";

const features = [
  {
    icon: Clock,
    title: "24/7 Доступность",
    description: "Ваш ИИ-регистратор никогда не спит, не болеет и не берет выходные. Каждый звонок будет обработан профессионально.",
    gradient: "from-blue-400 to-blue-600"
  },
  {
    icon: Calendar,
    title: "Автоматическая запись",
    description: "Интеграция с Google Calendar, Calendly и другими системами. Клиенты записываются сами, без вашего участия.",
    gradient: "from-green-400 to-green-600"
  },
  {
    icon: MessageSquare,
    title: "Естественные диалоги",
    description: "ИИ ведет беседу как живой человек, отвечает на вопросы и собирает всю необходимую информацию о клиенте.",
    gradient: "from-purple-400 to-purple-600"
  },
  {
    icon: BarChart3,
    title: "Аналитика и отчеты",
    description: "Подробная статистика звонков, конверсии и эффективности. Видите, что работает, а что нужно улучшить.",
    gradient: "from-orange-400 to-orange-600"
  },
  {
    icon: Shield,
    title: "Безопасность данных",
    description: "Все разговоры шифруются, данные клиентов защищены. Соответствие GDPR и другим стандартам безопасности.",
    gradient: "from-red-400 to-red-600"
  },
  {
    icon: Zap,
    title: "Мгновенная настройка",
    description: "Запуск за 5 минут. Просто подключите номер, настройте сценарий и начинайте принимать звонки.",
    gradient: "from-yellow-400 to-yellow-600"
  }
];



export function FeaturesSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-24 text-white relative overflow-hidden">

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.h2 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Почему выбирают нашу{" "}
            <span className="text-gradient">CRM-систему?</span>
          </motion.h2>
          <motion.p 
            className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Передовые технологии искусственного интеллекта для максимальной эффективности вашего бизнеса
          </motion.p>
        </motion.div>



        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="apple-card-dark p-4 sm:p-6 lg:p-8 hover:scale-105 transition-all duration-300 group relative overflow-hidden"
            >
              {/* Floating background elements */}
              <div className="absolute -top-2 -right-2 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-4 sm:mb-6 shadow-lg floating group-hover:scale-110 transition-transform duration-300`} style={{ animationDelay: `${index * 0.3}s` }}>
                <feature.icon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
              </div>
              
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gradient group-hover:text-white transition-colors duration-300">
                {feature.title}
              </h3>
              
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                {feature.description}
              </p>

              {/* Subtle border glow on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}