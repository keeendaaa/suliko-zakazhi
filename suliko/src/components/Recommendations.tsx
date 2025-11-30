import { motion } from 'motion/react';
import { MenuItem } from './types';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { TrendingUp, ChefHat, Clock, Award } from 'lucide-react';
import { useMemo } from 'react';

interface RecommendationsProps {
  onItemClick: (item: MenuItem) => void;
  menuItems: MenuItem[];
}

// Функция для случайного перемешивания массива
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function Recommendations({ onItemClick, menuItems }: RecommendationsProps) {
  // Генерируем случайные рекомендации из реальных блюд
  const recommendations = useMemo(() => {
    if (menuItems.length === 0) {
      return {
        popular: [],
        chef: [],
        quick: [],
        signature: [],
      };
    }

    const shuffled = shuffleArray(menuItems);
    
    return {
      popular: shuffled.slice(0, 3), // Хиты недели - 3 случайных блюда
      chef: shuffled.slice(3, 5), // Выбор шеф-повара - 2 случайных блюда
      quick: shuffled.slice(5, 7), // Быстрые блюда - 2 случайных блюда
      signature: shuffled.slice(7, 8), // Фирменное блюдо - 1 случайное блюдо
    };
  }, [menuItems]);

  // Получаем URL изображения для блюда
  const getImageUrl = (item: MenuItem): string => {
    if (item.photos && item.photos.length > 0) {
      return item.photos[0];
    }
    return item.image || '';
  };

  if (menuItems.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-3 py-6 pb-24">
        <div className="text-center py-20">
          <p className="text-[#DC143C]/60 text-lg">Загрузка рекомендаций...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-3 py-6 pb-24">
      {/* Popular Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-gradient-to-br from-[#DC143C] to-[#8B0000] p-2.5 rounded-xl shadow-lg">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-[#DC143C]">Хиты недели</h2>
            <p className="text-gray-500 text-xs">Самые популярные блюда</p>
          </div>
        </div>

        <div className="overflow-x-auto -mx-3 px-3 scrollbar-hide">
          <div className="flex gap-3 pb-2">
            {recommendations.popular.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                onClick={() => onItemClick(item)}
                className="flex-shrink-0 w-64 bg-white rounded-2xl overflow-hidden shadow-md active:scale-95 transition-transform cursor-pointer"
              >
                <div className="relative h-40 bg-gradient-to-br from-[#DC143C]/5 to-[#FFF8F0]">
                  <ImageWithFallback
                    src={getImageUrl(item)}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
                    <span className="text-[#DC143C]">{item.price} ₽</span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-[#DC143C] mb-1">{item.name}</h3>
                  <p className="text-gray-600 text-sm line-clamp-2">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Chef's Choice Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-gradient-to-br from-[#DC143C] to-[#8B0000] p-2.5 rounded-xl shadow-lg">
            <ChefHat className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-[#DC143C]">Выбор шеф-повара</h2>
            <p className="text-gray-500 text-xs">Авторские рецепты</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {recommendations.chef.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.4 }}
              onClick={() => onItemClick(item)}
              className="bg-white rounded-xl overflow-hidden shadow-md active:scale-95 transition-transform cursor-pointer"
            >
              <div className="relative h-32 bg-gradient-to-br from-[#DC143C]/10 to-[#8B0000]/5">
                <ImageWithFallback
                  src={getImageUrl(item)}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-[#DC143C] text-white px-2 py-1 rounded-lg text-xs shadow-md flex items-center gap-1">
                  <ChefHat className="w-3 h-3 inline mr-1" />
                  Шеф
                </div>
              </div>
              <div className="p-3">
                <h3 className="text-[#DC143C] text-sm mb-1">{item.name}</h3>
                <p className="text-gray-600 text-xs mb-2 line-clamp-2">{item.description}</p>
                <span className="text-[#DC143C]">{item.price} ₽</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Quick Meals Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-gradient-to-br from-[#DC143C] to-[#8B0000] p-2.5 rounded-xl shadow-lg">
            <Clock className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-[#DC143C]">Быстрые блюда</h2>
            <p className="text-gray-500 text-xs">Приготовим за 15 минут</p>
          </div>
        </div>

        <div className="space-y-3">
          {recommendations.quick.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
              onClick={() => onItemClick(item)}
              className="bg-white rounded-xl overflow-hidden shadow-md active:scale-98 transition-transform cursor-pointer flex"
            >
              <div className="relative w-28 h-28 flex-shrink-0 bg-gradient-to-br from-[#DC143C]/10 to-[#8B0000]/5">
                <ImageWithFallback
                  src={getImageUrl(item)}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 p-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="text-[#DC143C] text-sm">{item.name}</h3>
                    <div className="bg-[#DC143C]/10 text-[#DC143C] px-2 py-0.5 rounded-full text-[10px] flex items-center gap-1 ml-2">
                      <Clock className="w-2.5 h-2.5" />
                      15 мин
                    </div>
                  </div>
                  <p className="text-gray-600 text-xs line-clamp-2">{item.description}</p>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[#DC143C]">{item.price} ₽</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Signature Dish Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-gradient-to-br from-[#DC143C] to-[#8B0000] p-2.5 rounded-xl shadow-lg">
            <Award className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-[#DC143C]">Фирменное блюдо</h2>
            <p className="text-gray-500 text-xs">Гордость нашего ресторана</p>
          </div>
        </div>

        {recommendations.signature.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }}
            onClick={() => onItemClick(item)}
            className="bg-gradient-to-br from-[#DC143C]/5 via-white to-[#8B0000]/5 rounded-2xl overflow-hidden shadow-lg active:scale-98 transition-transform cursor-pointer border border-[#DC143C]/20"
          >
            <div className="relative h-48 bg-gradient-to-br from-[#DC143C]/10 to-[#8B0000]/5">
              <ImageWithFallback
                src={getImageUrl(item)}
                alt={item.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute top-3 left-3 bg-gradient-to-r from-[#DC143C] to-[#8B0000] text-white px-3 py-1.5 rounded-full text-xs shadow-lg flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5" />
                Фирменное блюдо
              </div>
              <div className="absolute bottom-3 left-3 right-3">
                <h3 className="text-white mb-1">{item.name}</h3>
                <p className="text-white/90 text-sm">{item.description}</p>
              </div>
            </div>
            <div className="p-4 bg-white">
              <div className="flex items-center justify-between">
                <span className="text-[#DC143C]">{item.price} ₽</span>
                <span className="text-[#DC143C]/60 text-xs">Нажмите для подробностей</span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
