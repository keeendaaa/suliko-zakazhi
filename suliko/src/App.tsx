import { useState, useEffect } from 'react';
import { MenuHeader } from './components/MenuHeader';
import { CategoryTabs } from './components/CategoryTabs';
import { MenuGrid } from './components/MenuGrid';
import { MenuItem } from './components/types';
import { BottomNav } from './components/BottomNav';
import { Recommendations } from './components/Recommendations';
import { AIWaiter } from './components/AIWaiter';
import { MenuDetailModal } from './components/MenuDetailModal';
import { SplashScreen } from './components/SplashScreen';
import { loadMenuDataAsync } from './utils/menuLoader';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'recommendations' | 'menu' | 'ai'>('menu');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<string[]>(['all']);
  const [menuLoading, setMenuLoading] = useState(true);

  // Загружаем данные меню из JSON асинхронно
  useEffect(() => {
    console.log('Начинаем загрузку меню...');
    loadMenuDataAsync().then((data) => {
      console.log('В App загружено:', data.items.length, 'блюд');
      console.log('Категории:', data.categories);
      setMenuItems(data.items);
      setCategories(data.categories);
      setMenuLoading(false);
    }).catch((error) => {
      console.error('Ошибка при загрузке меню:', error);
      setMenuLoading(false);
    });
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
          {menuLoading ? (
            <div className="text-center py-20">
              <p className="text-[#DC143C]/60 text-lg">Загрузка меню...</p>
            </div>
          ) : (
            <MenuGrid items={filteredItems} onItemClick={setSelectedItem} />
          )}
        </>
      )}

      {activeTab === 'recommendations' && <Recommendations onItemClick={setSelectedItem} menuItems={menuItems} />}
      
      {activeTab === 'ai' && <AIWaiter menuItems={menuItems} onItemClick={setSelectedItem} />}

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      
      {selectedItem && (
        <MenuDetailModal 
          item={selectedItem} 
          onClose={() => setSelectedItem(null)}
          menuItems={menuItems}
          onItemClick={setSelectedItem}
        />
      )}
    </div>
    </>
  );
}