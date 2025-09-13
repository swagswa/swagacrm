"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Анна Волкова",
      company: "Стоматологическая клиника 'Улыбка'",
      text: "За первый месяц использования количество записей увеличилось на 40%. ИИ работает даже лучше нашего администратора - никогда не устает и всегда вежлив с клиентами.",
      rating: 5,
      avatar: "AВ"
    },
    {
      name: "Михаил Петров",
      company: "Юридическая фирма 'Право и Порядок'",
      text: "Раньше мы теряли до 30% звонков в нерабочее время. Теперь каждый потенциальный клиент получает ответ и может записаться на консультацию. ROI окупился за 2 недели.",
      rating: 5,
      avatar: "МП"
    },
    {
      name: "Елена Сидорова",
      company: "Салон красоты 'Элегант'",
      text: "Клиенты в восторге! Они могут записаться в любое время, а ИИ знает все наши услуги и цены. Освободилось много времени для работы с клиентами вместо ответов на телефон.",
      rating: 5,
      avatar: "ЕС"
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-4 sm:mb-6 lg:mb-8">
            Что говорят наши клиенты
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto px-4">
            Более 1000 компаний уже трансформировали свой бизнес с нашим ИИ-регистратором
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-zinc-900 rounded-2xl p-4 sm:p-6 lg:p-8 border border-zinc-800 hover:border-zinc-700 transition-all duration-300 relative"
            >
              {/* Quote icon */}
              <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-10 h-10 sm:w-12 sm:h-12 bg-blue-500 rounded-full flex items-center justify-center">
                <Quote className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-4 sm:mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Testimonial text */}
              <blockquote className="text-gray-300 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base lg:text-lg">
                &ldquo;{testimonial.text}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-xs sm:text-sm">{testimonial.avatar}</span>
                </div>
                <div className="min-w-0">
                  <div className="text-white font-semibold text-sm sm:text-base">{testimonial.name}</div>
                  <div className="text-gray-400 text-xs sm:text-sm truncate">{testimonial.company}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-8 sm:mt-12 lg:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 text-center"
        >
          <div>
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-400 mb-1 sm:mb-2">4.9/5</div>
            <p className="text-gray-400 text-xs sm:text-sm lg:text-base">Средняя оценка</p>
          </div>
          <div>
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-400 mb-1 sm:mb-2">1000+</div>
            <p className="text-gray-400 text-xs sm:text-sm lg:text-base">Довольных клиентов</p>
          </div>
          <div>
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-purple-400 mb-1 sm:mb-2">40%</div>
            <p className="text-gray-400 text-xs sm:text-sm lg:text-base">Рост конверсии</p>
          </div>
          <div>
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-yellow-400 mb-1 sm:mb-2">24/7</div>
            <p className="text-gray-400 text-xs sm:text-sm lg:text-base">Поддержка клиентов</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}