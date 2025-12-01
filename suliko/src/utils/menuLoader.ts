// Загружаем данные через fetch из public папки
// Это более надежный способ для Vite

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
  // Используем base path из vite.config
  const baseUrl = import.meta.env.BASE_URL || '/yourgos/';
  return `${baseUrl}images_suliko/${fileName}`;
}

// Кэш для загруженных данных
let menuDataCache: MenuData | null = null;

export async function loadMenuDataAsync(): Promise<{ items: MenuItem[]; categories: string[] }> {
  if (menuDataCache) {
    return processMenuData(menuDataCache);
  }

  try {
    // Используем base path из vite.config (import.meta.env.BASE_URL)
    const baseUrl = import.meta.env.BASE_URL || '/yourgos/';
    const menuUrl = `${baseUrl}menu.json`;
    console.log('Загружаем меню из:', menuUrl);
    
    const response = await fetch(menuUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json() as MenuData;
    menuDataCache = data;
    return processMenuData(data);
  } catch (error) {
    console.error('Ошибка загрузки меню через fetch:', error);
    return { items: [], categories: ['all'] };
  }
}

function processMenuData(data: MenuData): { items: MenuItem[]; categories: string[] } {
  try {
    const items: MenuItem[] = [];
    const categorySet = new Set<string>(['all']);

    if (!data || !data.sections) {
      console.error('Некорректная структура данных меню', data);
      return { items: [], categories: ['all'] };
    }
    
    console.log('Найдено секций:', data.sections.length);

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
    if (items.length > 0) {
      console.log('Пример блюда:', items[0]);
    }

    return {
      items,
      categories: Array.from(categorySet),
    };
  } catch (error) {
    console.error('Ошибка обработки данных меню:', error);
    return { items: [], categories: ['all'] };
  }
}

// Синхронная версия для обратной совместимости (попытается использовать кэш)
export function loadMenuData(): { items: MenuItem[]; categories: string[] } {
  if (menuDataCache) {
    return processMenuData(menuDataCache);
  }
  
  // Если данных нет в кэше, возвращаем пустой массив
  // В этом случае нужно использовать loadMenuDataAsync
  console.warn('Данные меню еще не загружены. Используйте loadMenuDataAsync или дождитесь загрузки.');
  return { items: [], categories: ['all'] };
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

