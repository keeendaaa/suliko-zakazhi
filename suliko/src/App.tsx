import { useState, useMemo } from 'react';
import { MenuHeader } from './components/MenuHeader';
import { CategoryTabs } from './components/CategoryTabs';
import { MenuGrid } from './components/MenuGrid';
import { MenuItem } from './components/types';
import { BottomNav } from './components/BottomNav';
import { Recommendations } from './components/Recommendations';
import { AIWaiter } from './components/AIWaiter';
import { MenuDetailModal } from './components/MenuDetailModal';
import { SplashScreen } from './components/SplashScreen';
import { loadMenuData } from './utils/menuLoader';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'recommendations' | 'menu' | 'ai'>('menu');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  // Загружаем данные меню из JSON
  const { items: menuItems, categories } = useMemo(() => {
    try {
      const data = loadMenuData();
      console.log('В App загружено:', data.items.length, 'блюд');
      return data;
    } catch (error) {
      console.error('Ошибка при загрузке меню:', error);
      return { items: [], categories: ['all'] };
    }
  }, []);

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
            categories={categories}
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