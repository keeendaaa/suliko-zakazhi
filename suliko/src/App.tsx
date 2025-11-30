import { useState } from 'react';
import { MenuHeader } from './components/MenuHeader';
import { CategoryTabs } from './components/CategoryTabs';
import { MenuGrid } from './components/MenuGrid';
import { MenuItem } from './components/types';
import { BottomNav } from './components/BottomNav';
import { Recommendations } from './components/Recommendations';
import { AIWaiter } from './components/AIWaiter';
import { MenuDetailModal } from './components/MenuDetailModal';
import { SplashScreen } from './components/SplashScreen';

const menuItems: MenuItem[] = [
  // Закуски
  {
    id: 1,
    name: 'Пхали ассорти',
    description: 'Три вида пхали из шпината, свеклы и фасоли с орехами и специями',
    price: 650,
    category: 'appetizers',
    image: 'pkhali appetizer'
  },
  {
    id: 2,
    name: 'Сулугуни на кеци',
    description: 'Запеченный сыр сулугуни в глиняной посуде',
    price: 520,
    category: 'appetizers',
    image: 'suluguni cheese'
  },
  {
    id: 3,
    name: 'Бадриджани',
    description: 'Рулетики из баклажанов с ореховой пастой и гранатом',
    price: 580,
    category: 'appetizers',
    image: 'badrijani eggplant'
  },
  {
    id: 4,
    name: 'Лобио',
    description: 'Красная фасоль в ореховом соусе со специями и зеленью',
    price: 480,
    category: 'appetizers',
    image: 'lobio beans'
  },
  
  // Основные блюда
  {
    id: 5,
    name: 'Хинкали',
    description: 'Сочные грузинские пельмени с мясом и бульоном, 5 штук',
    price: 450,
    category: 'mains',
    image: 'khinkali dumplings'
  },
  {
    id: 6,
    name: 'Хачапури по-аджарски',
    description: 'Лодочка из теста с сыром, маслом и яйцом',
    price: 680,
    category: 'mains',
    image: 'adjarian khachapuri'
  },
  {
    id: 7,
    name: 'Шашлык из баранины',
    description: 'Сочный шашлык из отборной баранины с луком и зеленью',
    price: 1250,
    category: 'mains',
    image: 'lamb shashlik'
  },
  {
    id: 8,
    name: 'Чахохбили',
    description: 'Тушеная курица в томатном соусе с луком и специями',
    price: 890,
    category: 'mains',
    image: 'chakhokhbili chicken'
  },
  
  // Десерты
  {
    id: 9,
    name: 'Чурчхела',
    description: 'Традиционная грузинская сладость из орехов в виноградном соке',
    price: 320,
    category: 'desserts',
    image: 'churchkhela sweet'
  },
  {
    id: 10,
    name: 'Пеламуши',
    description: 'Десерт из виноградного сока с кукурузной мукой',
    price: 280,
    category: 'desserts',
    image: 'pelamushi dessert'
  },
  {
    id: 11,
    name: 'Гозинаки',
    description: 'Медовые конфеты с грецкими орехами',
    price: 350,
    category: 'desserts',
    image: 'gozinaki nuts'
  },
  {
    id: 12,
    name: 'Назуки',
    description: 'Сладкий хлеб с изюмом и специями',
    price: 250,
    category: 'desserts',
    image: 'nazuki bread'
  },
  
  // Напитки
  {
    id: 13,
    name: 'Тархун',
    description: 'Освежающий напиток из эстрагона',
    price: 180,
    category: 'drinks',
    image: 'tarragon drink'
  },
  {
    id: 14,
    name: 'Лагидзе',
    description: 'Грузинский лимонад с натуральным сиропом',
    price: 200,
    category: 'drinks',
    image: 'lagidze lemonade'
  },
  {
    id: 15,
    name: 'Боржоми',
    description: 'Знаменитая грузинская минеральная вода',
    price: 150,
    category: 'drinks',
    image: 'borjomi water'
  },
  {
    id: 16,
    name: 'Вино Саперави',
    description: 'Красное сухое вино из грузинского винограда, бокал',
    price: 420,
    category: 'drinks',
    image: 'saperavi wine'
  },
];

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'recommendations' | 'menu' | 'ai'>('menu');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const filteredItems = selectedCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  return (
    <>
      {isLoading && <SplashScreen onComplete={() => setIsLoading(false)} />}
      <div className="min-h-screen bg-[#FFF8F0] pb-16">
      <MenuHeader />
      
      {activeTab === 'menu' && (
        <>
          <CategoryTabs 
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
          <MenuGrid items={filteredItems} onItemClick={setSelectedItem} />
        </>
      )}

      {activeTab === 'recommendations' && <Recommendations onItemClick={setSelectedItem} />}
      
      {activeTab === 'ai' && <AIWaiter />}

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      
      {selectedItem && (
        <MenuDetailModal 
          item={selectedItem} 
          onClose={() => setSelectedItem(null)} 
        />
      )}
    </div>
    </>
  );
}