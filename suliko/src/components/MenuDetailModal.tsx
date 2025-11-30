import { motion, AnimatePresence } from 'motion/react';
import { MenuItem } from './types';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { X } from 'lucide-react';
import { useEffect } from 'react';

interface MenuDetailModalProps {
  item: MenuItem;
  onClose: () => void;
}

const imageMap: Record<string, string> = {
  'pkhali appetizer': 'https://images.unsplash.com/photo-1741026079032-7cb660e44bad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwa2hhbGklMjBhcHBldGl6ZXJ8ZW58MXx8fHwxNzY0NTM0NjA5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'suluguni cheese': 'https://images.unsplash.com/photo-1723473620176-8d26dc6314cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdWx1Z3VuaSUyMGNoZWVzZXxlbnwxfHx8fDE3NjQ1MzQ2MDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'badrijani eggplant': 'https://images.unsplash.com/photo-1659261111792-66709e46d53d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWRyaWphbmklMjBlZ2dwbGFudHxlbnwxfHx8fDE3NjQ1MzQ2MTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'lobio beans': 'https://images.unsplash.com/photo-1612504258838-fbf14fe4437d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb2JpbyUyMGJlYW5zfGVufDF8fHx8MTc2NDUzNDYxMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'khinkali dumplings': 'https://images.unsplash.com/photo-1687686515394-5f5b7d50b01b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraGlua2FsaSUyMGR1bXBsaW5nc3xlbnwxfHx8fDE3NjQ1MzQ2MTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'adjarian khachapuri': 'https://images.unsplash.com/photo-1597566360895-5d93e580554e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZGphcmlhbiUyMGtoYWNoYXB1cml8ZW58MXx8fHwxNzY0NTM0NjExfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'lamb shashlik': 'https://images.unsplash.com/photo-1757251211602-679057dcf0bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYW1iJTIwc2hhc2hsaWt8ZW58MXx8fHwxNzY0NTM0NjExfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'chakhokhbili chicken': 'https://images.unsplash.com/photo-1763326312048-bda0501976c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGFraG9raGJpbGklMjBjaGlja2VufGVufDF8fHx8MTc2NDUzNDYxMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'churchkhela sweet': 'https://images.unsplash.com/photo-1761416351534-86c7ac0df1e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVyY2hraGVsYSUyMHN3ZWV0fGVufDF8fHx8MTc2NDUzNDYxMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'pelamushi dessert': 'https://images.unsplash.com/photo-1752245055475-8b7c3b4756ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZWxhbXVzaGklMjBkZXNzZXJ0fGVufDF8fHx8MTc2NDUzNDYxMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'gozinaki nuts': 'https://images.unsplash.com/photo-1705276920826-552f079a391e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob25leSUyMHdhbG51dCUyMGNhbmR5fGVufDF8fHx8MTc2NDUzNDYxN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'nazuki bread': 'https://images.unsplash.com/photo-1609889132708-e31330e6c7a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXp1a2klMjBicmVhZHxlbnwxfHx8fDE3NjQ1MzQ2MTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'tarragon drink': 'https://images.unsplash.com/photo-1568268205735-fbb7cbb46e23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YXJyYWdvbiUyMGRyaW5rfGVufDF8fHx8MTc2NDUzNDYxM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'lagidze lemonade': 'https://images.unsplash.com/photo-1679934576534-72d79d027fdc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYWdpZHplJTIwbGVtb25hZGV8ZW58MXx8fHwxNzY0NTM0NjE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'borjomi water': 'https://images.unsplash.com/photo-1682226480942-1e33b528d2f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib3Jqb21pJTIwd2F0ZXJ8ZW58MXx8fHwxNzY0NTM0NjE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'saperavi wine': 'https://images.unsplash.com/photo-1649789093457-3a973148fa27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYXBlcmF2aSUyMHdpbmV8ZW58MXx8fHwxNzY0NTM0NjE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
};

export function MenuDetailModal({ item, onClose }: MenuDetailModalProps) {
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
              src={imageMap[item.image]}
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
            <div className="border-t border-[#DC143C]/10 pt-5 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 bg-[#DC143C] rounded-full"></div>
                <span className="text-gray-700 text-sm">Время приготовления: 15-20 минут</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 bg-[#DC143C] rounded-full"></div>
                <span className="text-gray-700 text-sm">Порция: 250г</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 bg-[#DC143C] rounded-full"></div>
                <span className="text-gray-700 text-sm">Калорийность: {Math.floor(Math.random() * 400 + 200)} ккал</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
