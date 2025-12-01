import { MenuItem } from '../components/types';

export interface CartItem {
  item: MenuItem;
  quantity: number;
}

export interface Order {
  items: Array<{
    id: number;
    name: string;
    price: number;
    quantity: number;
  }>;
  total: number;
  timestamp: string;
}

const WEBHOOK_URL = 'https://n8n.zakazhi.org/webhook/order-suliko';

/**
 * Отправляет заказ на вебхук
 */
export async function sendOrder(order: Order): Promise<{ success: boolean; message?: string }> {
  console.log('🚀 [sendOrder] Начинаем отправку заказа:', order);
  console.log('🚀 [sendOrder] URL вебхука:', WEBHOOK_URL);
  
  try {
    const requestBody = JSON.stringify(order);
    console.log('🚀 [sendOrder] Тело запроса:', requestBody);
    
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: requestBody,
    });

    console.log('🚀 [sendOrder] Получен ответ:', {
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries()),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Не удалось прочитать ответ');
      console.error('❌ [sendOrder] HTTP ошибка:', response.status, errorText);
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText.substring(0, 100)}`);
    }

    const data = await response.json().catch(() => {
      const text = response.text();
      console.log('⚠️ [sendOrder] Ответ не JSON, текст:', text);
      return {};
    });
    
    console.log('✅ [sendOrder] Заказ успешно отправлен, ответ:', data);
    return { success: true, message: data.message || 'Заказ успешно отправлен' };
  } catch (error) {
    console.error('❌ [sendOrder] Ошибка при отправке заказа:', error);
    console.error('❌ [sendOrder] Тип ошибки:', error instanceof Error ? error.constructor.name : typeof error);
    console.error('❌ [sendOrder] Стек ошибки:', error instanceof Error ? error.stack : 'нет стека');
    
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Не удалось отправить заказ' 
    };
  }
}

/**
 * Преобразует корзину в заказ
 */
export function createOrderFromCart(cartItems: CartItem[]): Order {
  const items = cartItems.map(cartItem => ({
    id: cartItem.item.id,
    name: cartItem.item.name,
    price: cartItem.item.price,
    quantity: cartItem.quantity,
  }));

  const total = cartItems.reduce(
    (sum, cartItem) => sum + cartItem.item.price * cartItem.quantity,
    0
  );

  return {
    items,
    total,
    timestamp: new Date().toISOString(),
  };
}

