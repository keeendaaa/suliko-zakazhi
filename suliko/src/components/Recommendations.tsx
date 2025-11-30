import { motion } from 'motion/react';
import { MenuItem } from './types';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { TrendingUp, ChefHat, Clock, Award } from 'lucide-react';

interface RecommendationsProps {
  onItemClick: (item: MenuItem) => void;
}

const imageMap: Record<string, string> = {
  'khinkali dumplings': 'https://images.unsplash.com/photo-1687686515394-5f5b7d50b01b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraGlua2FsaSUyMGR1bXBsaW5nc3xlbnwxfHx8fDE3NjQ1MzQ2MTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'adjarian khachapuri': 'https://images.unsplash.com/photo-1597566360895-5d93e580554e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZGphcmlhbiUyMGtoYWNoYXB1cml8ZW58MXx8fHwxNzY0NTM0NjExfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'pkhali appetizer': 'https://images.unsplash.com/photo-1741026079032-7cb660e44bad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwa2hhbGklMjBhcHBldGl6ZXJ8ZW58MXx8fHwxNzY0NTM0NjA5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'lamb shashlik': 'https://images.unsplash.com/photo-1757251211602-679057dcf0bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYW1iJTIwc2hhc2hsaWt8ZW58MXx8fHwxNzY0NTM0NjExfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'lobio': 'https://images.unsplash.com/photo-1645696329346-6d3f1b13d413?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb2Jpb3xlbnwxfHx8fDE3NjQ1MzQ2MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'satsivi': 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYXRzaXZpfGVufDF8fHx8MTc2NDUzNDYxM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'kharcho soup': 'https://images.unsplash.com/photo-1674927088227-1dae2cf25ddf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraGFyY2hvJTIwc291cHxlbnwxfHx8fDE3NjQ1MzQ2MTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'chakapuli': 'https://images.unsplash.com/photo-1572449043416-55f4685c9bb6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGFrYXB1bGl8ZW58MXx8fHwxNzY0NTM0NjE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
};

const popularItems: MenuItem[] = [
  {
    id: 5,
    name: 'Хинкали',
    description: 'Сочные грузинские пельмени с мясом и бульоном',
    price: 450,
    category: 'mains',
    image: 'khinkali dumplings',
  },
  {
    id: 6,
    name: 'Хачапури по-аджарски',
    description: 'Лодочка из теста с сыром, маслом и яйцом',
    price: 680,
    category: 'mains',
    image: 'adjarian khachapuri',
  },
  {
    id: 7,
    name: 'Шашлык из баранины',
    description: 'Сочный шашлык из отборной баранины',
    price: 1250,
    category: 'mains',
    image: 'lamb shashlik',
  },
];

const chefItems: MenuItem[] = [
  {
    id: 1,
    name: 'Пхали ассорти',
    description: 'Три вида пхали из шпината, свеклы и фасоли',
    price: 650,
    category: 'appetizers',
    image: 'pkhali appetizer',
  },
  {
    id: 8,
    name: 'Лобио',
    description: 'Фасоль в ореховом соусе с кинзой',
    price: 450,
    category: 'appetizers',
    image: 'lobio',
  },
];

const quickItems: MenuItem[] = [
  {
    id: 9,
    name: 'Харчо',
    description: 'Наваристый суп с говядиной и рисом',
    price: 550,
    category: 'soups',
    image: 'kharcho soup',
  },
  {
    id: 10,
    name: 'Чакапули',
    description: 'Молодая баранина с зеленью и специями',
    price: 950,
    category: 'mains',
    image: 'chakapuli',
  },
];

const signatureItems: MenuItem[] = [
  {
    id: 11,
    name: 'Сацivi',
    description: 'Курица в ореховом соусе с пряностями',
    price: 850,
    category: 'mains',
    image: 'satsivi',
  },
];

export function Recommendations({ onItemClick }: RecommendationsProps) {
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
            {popularItems.map((item, index) => (
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
                    src={imageMap[item.image]}
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
          {chefItems.map((item, index) => (
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
                  src={imageMap[item.image]}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-[#DC143C] text-white px-2 py-1 rounded-lg text-xs shadow-md">
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
          {quickItems.map((item, index) => (
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
                  src={imageMap[item.image]}
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

        {signatureItems.map((item, index) => (
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
                src={imageMap[item.image]}
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