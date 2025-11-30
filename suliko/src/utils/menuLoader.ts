// Загружаем данные синхронно через статический импорт
// Vite поддерживает импорт JSON файлов
import menuDataRaw from '../data/menu.json';

export interface MenuSection {
  title: string;
  items: MenuItem[];
  description?: string[];
}

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  portion: string;
  category: string;
  photos: string[];
  image?: string; // для обратной совместимости
}

export interface MenuData {
  title: string;
  sections: MenuSection[];
}

// Маппинг названий разделов на категории
const sectionToCategory: Record<string, string> = {
  'ВЫПЕЧКА': 'baking',
  'Холодные ЗАКУСКИ': 'appetizers',
  'САЛАТЫ': 'salads',
};

// Преобразуем путь к изображению в URL для Vite
function getImageUrl(photoPath: string): string {
  // Извлекаем имя файла из пути (например, image1.png)
  const fileName = photoPath.split('/').pop() || '';
  // В Vite файлы из папки public доступны по корневому пути
  return `/images_suliko/${fileName}`;
}

export function loadMenuData(): { items: MenuItem[]; categories: string[] } {
  try {
    const data = menuDataRaw as unknown as MenuData;
    const items: MenuItem[] = [];
    const categorySet = new Set<string>(['all']);

    if (!data || !data.sections) {
      console.error('Некорректная структура данных меню');
      return { items: [], categories: ['all'] };
    }

    let itemId = 1;
    
    data.sections.forEach((section) => {
      if (!section || !section.items) return;
      
      const category = sectionToCategory[section.title] || section.title.toLowerCase().replace(/\s+/g, '-');
      categorySet.add(category);

      section.items.forEach((item) => {
        if (!item) return;
        
        const description = item.description && Array.isArray(item.description) && item.description.length > 0 
          ? item.description.join(' ') 
          : '';
        
        const photos = item.photos && Array.isArray(item.photos) ? item.photos : [];
        const firstPhoto = photos.length > 0 
          ? getImageUrl(photos[0]) 
          : '';

        items.push({
          id: itemId++,
          name: item.name || 'Без названия',
          description,
          price: item.price?.value || 0,
          portion: item.portion || '',
          category,
          photos: photos.map(getImageUrl),
          image: firstPhoto, // для обратной совместимости
        });
      });
    });

    console.log('Загружено блюд:', items.length);
    console.log('Категории:', Array.from(categorySet));
    console.log('Пример блюда:', items[0]);

    return {
      items,
      categories: Array.from(categorySet),
    };
  } catch (error) {
    console.error('Ошибка загрузки меню:', error);
    return { items: [], categories: ['all'] };
  }
}

export function getCategoryName(categoryId: string): string {
  const categoryNames: Record<string, string> = {
    'all': 'Все',
    'baking': 'Выпечка',
    'appetizers': 'Холодные закуски',
    'salads': 'Салаты',
  };
  return categoryNames[categoryId] || categoryId;
}

