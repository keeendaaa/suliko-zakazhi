import { motion } from 'motion/react';
import { UtensilsCrossed, Coffee, Cake, Wine, ChefHat } from 'lucide-react';
import { Category } from './types';
import { getCategoryName } from '../utils/menuLoader';

interface CategoryTabsProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  categories: string[];
}

const defaultCategories: Category[] = [
  { id: 'all', name: 'Все', icon: 'utensils' },
  { id: 'baking', name: 'Выпечка', icon: 'chef' },
  { id: 'appetizers', name: 'Закуски', icon: 'utensils' },
  { id: 'salads', name: 'Салаты', icon: 'utensils' },
];

const iconMap = {
  utensils: UtensilsCrossed,
  coffee: Coffee,
  cake: Cake,
  wine: Wine,
  chef: ChefHat,
};

export function CategoryTabs({ selectedCategory, onSelectCategory, categories }: CategoryTabsProps) {
  // Создаем категории из списка, используя маппинг
  const categoryList = categories.map((catId) => {
    const defaultCat = defaultCategories.find(c => c.id === catId);
    return {
      id: catId,
      name: defaultCat?.name || getCategoryName(catId),
      icon: defaultCat?.icon || 'utensils',
    };
  });

  return (
    <div className="sticky top-0 z-40 bg-[#FFF8F0] border-b border-[#DC143C]/10 shadow-sm">
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-2 px-3 py-2.5 min-w-max">
          {categoryList.map((category) => {
            const Icon = iconMap[category.icon as keyof typeof iconMap] || UtensilsCrossed;
            const isSelected = selectedCategory === category.id;
            
            return (
              <motion.button
                key={category.id}
                onClick={() => onSelectCategory(category.id)}
                className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-full whitespace-nowrap transition-all text-xs ${
                  isSelected 
                    ? 'bg-[#DC143C] text-white shadow-md shadow-[#DC143C]/30' 
                    : 'bg-white text-[#DC143C] active:bg-[#DC143C]/5 border border-[#DC143C]/20'
                }`}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{category.name}</span>
                
                {isSelected && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-[#DC143C] rounded-full -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}