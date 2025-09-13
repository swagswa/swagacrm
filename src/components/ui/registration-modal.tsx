"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Zap, Shield, Clock } from "lucide-react";
import Link from "next/link";

const benefits = [
  { icon: Zap, text: "Настройка за 5 минут" },
  { icon: Shield, text: "Без долгосрочных обязательств" },
  { icon: Clock, text: "Поддержка 24/7" }
];

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RegistrationModal({ isOpen, onClose }: RegistrationModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [telegram, setTelegram] = useState('');
  const [consent, setConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!consent) {
      setSubmitMessage('Необходимо согласие на обработку персональных данных');
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          phone,
          telegram,
          consent,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitMessage('Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.');
        // Очищаем форму
        setName('');
        setPhone('');
        setTelegram('');
        setConsent(false);
        // Закрываем модальное окно через 2 секунды
        setTimeout(() => {
          onClose();
          setSubmitMessage('');
        }, 2000);
      } else {
        setSubmitMessage(data.error || 'Произошла ошибка при отправке заявки');
      }
    } catch (error) {
      console.error('Ошибка отправки формы:', error);
      setSubmitMessage('Произошла ошибка при отправке заявки. Попробуйте позже.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="apple-card-dark p-4 sm:p-6 lg:p-8 max-w-2xl w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="space-y-4 sm:space-y-6">
              <div className="text-center">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gradient mb-3 sm:mb-4">
                  Хотите увидеть это в действии?
                </h3>
                <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6 px-2">
                  Оставьте заявку и получите доступ к закрытому тестированию нашей CRM системы с ИИ агентом
                </p>
              </div>

              <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4 sm:space-y-6 mb-6 sm:mb-8 relative z-50" style={{ pointerEvents: 'auto' }}>
                <div className="relative z-50" style={{ pointerEvents: 'auto' }}>
                   <input
                     type="text"
                     value={name}
                     onChange={(e) => setName(e.target.value)}
                     placeholder="Ваше ФИО"
                     required
                     className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white/20 transition-all duration-300 relative z-50 text-sm sm:text-base"
                     style={{ pointerEvents: 'auto', position: 'relative', zIndex: 50 }}
                   />
                 </div>
                
                <div className="relative z-50" style={{ pointerEvents: 'auto' }}>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Номер телефона"
                    required
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white/20 transition-all duration-300 relative z-50 text-sm sm:text-base"
                    style={{ pointerEvents: 'auto', position: 'relative', zIndex: 50 }}
                  />
                </div>
                
                <div className="relative z-50" style={{ pointerEvents: 'auto' }}>
                  <input
                    type="text"
                    value={telegram}
                    onChange={(e) => setTelegram(e.target.value)}
                    placeholder="Ник в Telegram (например, @username)"
                    required
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white/20 transition-all duration-300 relative z-50 text-sm sm:text-base"
                    style={{ pointerEvents: 'auto', position: 'relative', zIndex: 50 }}
                  />
                </div>
                
                {/* Checkbox for consent */}
                <div className="flex items-start gap-2 sm:gap-3 text-left relative z-50" style={{ pointerEvents: 'auto' }}>
                  <div className="relative flex-shrink-0 mt-0.5">
                    <input
                      type="checkbox"
                      id="consent"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="sr-only"
                    />
                    <label 
                      htmlFor="consent" 
                      className={`flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 border-2 rounded cursor-pointer transition-all duration-300 ${
                        consent 
                          ? 'bg-gradient-to-br from-blue-500 to-purple-600 border-blue-500 shadow-lg shadow-blue-500/30' 
                          : 'bg-white/10 border-white/30 hover:border-white/50'
                      }`}
                    >
                      {consent && (
                        <svg 
                          className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={3} 
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </label>
                  </div>
                  <div className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                     Согласие на{' '}
                     <Link 
                       href="/privacy" 
                       className="text-blue-400 hover:text-blue-300 underline transition-colors duration-200"
                       target="_blank"
                       rel="noopener noreferrer"
                     >
                       обработку персональных данных
                     </Link>
                   </div>
                </div>
                
                {submitMessage && (
                  <div className={`text-center p-3 rounded-lg text-sm ${
                    submitMessage.includes('успешно') 
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                      : 'bg-red-500/20 text-red-400 border border-red-500/30'
                  }`}>
                    {submitMessage}
                  </div>
                )}
                
                <motion.div
                  whileHover={consent && !isSubmitting ? { scale: 1.05 } : {}}
                  whileTap={consent && !isSubmitting ? { scale: 0.95 } : {}}
                  className="text-center"
                >
                  <button 
                    type="submit" 
                    disabled={!consent || isSubmitting}
                    className={`apple-button text-sm sm:text-base lg:text-xl font-semibold px-6 sm:px-8 lg:px-12 py-3 sm:py-4 lg:py-6 w-full sm:w-auto relative z-50 transition-all duration-300 ${
                      !consent || isSubmitting ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''
                    }`}
                    style={{ 
                      pointerEvents: consent && !isSubmitting ? 'auto' : 'none', 
                      position: 'relative', 
                      zIndex: 50 
                    }}
                  >
                    {isSubmitting ? 'Отправка...' : 'Записаться на закрытое тестирование'}
                  </button>
                </motion.div>
              </form>

              {/* Benefits List */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="space-y-3 sm:space-y-4"
              >
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    className="flex items-center gap-2 sm:gap-3 text-gray-300"
                  >
                    <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm sm:text-base lg:text-lg">{benefit.text}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}