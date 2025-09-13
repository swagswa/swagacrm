'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Mail, Phone } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900/50 backdrop-blur-sm border-t border-white/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <h3 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Volkov AI Agency
            </h3>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4"
          >
            <a 
              href="mailto:volkovaisolutions@gmail.com" 
              className="flex items-center gap-2 text-gray-300 hover:text-blue-400 transition-colors duration-200 text-xs sm:text-sm"
            >
              <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">volkovaisolutions@gmail.com</span>
              <span className="sm:hidden">Email</span>
            </a>
            <div className="flex items-center gap-2 text-gray-300 text-xs sm:text-sm">
              <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
              +7 (XXX) XXX-XX-XX
            </div>
          </motion.div>

          {/* Legal Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center md:text-right"
          >
            <Link 
              href="/privacy" 
              className="text-gray-300 text-xs sm:text-sm hover:text-blue-400 transition-colors duration-200"
            >
              Политика конфиденциальности
            </Link>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-white/5"
        >
          <div className="text-gray-500 text-xs sm:text-sm">
            © {currentYear} Volkov AI Agency. Все права защищены.
          </div>
        </motion.div>
      </div>
    </footer>
  );
}