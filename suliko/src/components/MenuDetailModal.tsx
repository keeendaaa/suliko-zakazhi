import { motion, AnimatePresence } from 'motion/react';
import { MenuItem } from './types';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { X } from 'lucide-react';
import { useEffect } from 'react';

interface MenuDetailModalProps {
  item: MenuItem;
  onClose: () => void;
}

export function MenuDetailModal({ item, onClose }: MenuDetailModalProps) {
  // Используем первое фото из массива или image для обратной совместимости
  const imageUrl = (item.photos && item.photos.length > 0) 
    ? item.photos[0] 
    : item.image || '';
  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end justify-center">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          className="relative bg-white rounded-t-3xl w-full max-h-[85vh] overflow-y-auto shadow-2xl"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-10 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg active:bg-white transition-colors"
          >
            <X className="w-5 h-5 text-[#DC143C]" />
          </button>

          {/* Image */}
          <div className="relative h-64 overflow-hidden bg-gradient-to-br from-[#DC143C]/5 to-[#FFF8F0]">
            <ImageWithFallback
              src={imageUrl}
              alt={item.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>

          {/* Content */}
          <div className="p-5">
            <div className="flex items-start justify-between gap-3 mb-3">
              <h2 className="text-[#DC143C]">{item.name}</h2>
              <div className="bg-[#DC143C] text-white px-3 py-1.5 rounded-full shrink-0 text-sm">
                <span>{item.price} ₽</span>
              </div>
            </div>

            <p className="text-gray-600 mb-5 text-sm">
              {item.description}
            </p>

            {/* Additional details */}
            {item.portion && (
              <div className="border-t border-[#DC143C]/10 pt-5 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-[#DC143C] rounded-full"></div>
                  <span className="text-gray-700 text-sm">Порция: {item.portion}</span>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
