import { motion } from 'motion/react';
import logo from 'figma:asset/66c7684d079e19f85730cc68db32ff3bb3c2f47d.png';

export function MenuHeader() {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative overflow-hidden bg-gradient-to-br from-[#DC143C] to-[#8B0000] text-white py-8 px-4"
    >
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>

      {/* Georgian ornamental pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <pattern id="georgian-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
            <circle cx="30" cy="30" r="2" fill="white"/>
            <circle cx="0" cy="0" r="2" fill="white"/>
            <circle cx="60" cy="60" r="2" fill="white"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#georgian-pattern)"/>
        </svg>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex justify-center mb-4"
        >
          <img src={logo} alt="Синико" className="h-20 object-contain" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-center"
        >
          <p className="text-sm text-white/90 max-w-2xl mx-auto">
            Традиции грузинского гостеприимства и аутентичные рецепты
          </p>
        </motion.div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 48h1440V24c-120 16-240 24-360 24-240 0-480-24-720-24S120 40 0 24v24z" fill="#FFF8F0"/>
        </svg>
      </div>
    </motion.header>
  );
}