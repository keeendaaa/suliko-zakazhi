import { motion } from 'motion/react';
import { MenuItem } from './types';
import { MenuCard } from './MenuCard';

interface MenuGridProps {
  items: MenuItem[];
  onItemClick: (item: MenuItem) => void;
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

export function MenuGrid({ items, onItemClick }: MenuGridProps) {
  return (
    <div className="max-w-6xl mx-auto px-3 py-4">
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: index * 0.05,
              duration: 0.4,
              ease: "easeOut"
            }}
          >
            <MenuCard item={item} imageUrl={imageMap[item.image]} onClick={() => onItemClick(item)} />
          </motion.div>
        ))}
      </motion.div>

      {items.length === 0 && (
        <div className="text-center py-20">
          <p className="text-[#DC143C]/60 text-lg">Блюда не найдены</p>
        </div>
      )}
    </div>
  );
}
