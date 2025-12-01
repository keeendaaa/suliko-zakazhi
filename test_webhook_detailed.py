#!/usr/bin/env python3
"""
Детальный тест вебхука с различными сценариями
"""
import requests
import json
from datetime import datetime
import socket

WEBHOOK_URL = 'https://n8n.zakazhi.org/webhook-test/order-suliko'

def test_dns_resolution(hostname):
    """Проверка разрешения DNS"""
    try:
        ip = socket.gethostbyname(hostname)
        print(f"✅ DNS разрешен: {hostname} -> {ip}")
        return True
    except socket.gaierror as e:
        print(f"❌ DNS не разрешен: {hostname}")
        print(f"   Ошибка: {e}")
        return False

def test_webhook(order_data):
    """Тест отправки заказа на вебхук"""
    print("\n" + "=" * 60)
    print("Тестирование вебхука заказов")
    print("=" * 60)
    print(f"\nURL: {WEBHOOK_URL}")
    print(f"\nТестовый заказ:")
    print(json.dumps(order_data, indent=2, ensure_ascii=False))

    try:
        print("\n" + "-" * 60)
        print("Отправка POST запроса...")
        print("-" * 60)
        
        response = requests.post(
            WEBHOOK_URL,
            json=order_data,
            headers={
                'Content-Type': 'application/json',
            },
            timeout=10
        )
        
        print(f"\n✅ Запрос отправлен успешно!")
        print(f"\nСтатус код: {response.status_code}")
        print(f"Заголовки ответа:")
        for key, value in response.headers.items():
            if key.lower() not in ['date', 'server', 'x-powered-by']:
                print(f"  {key}: {value}")
        
        print(f"\nТело ответа ({len(response.text)} символов):")
        try:
            response_json = response.json()
            print(json.dumps(response_json, indent=2, ensure_ascii=False))
        except:
            print(response.text[:500])
            if len(response.text) > 500:
                print("... (обрезано)")
        
        print("\n" + "=" * 60)
        if response.status_code == 200:
            print("✅ ВЕБХУК РАБОТАЕТ КОРРЕКТНО!")
            return True
        elif response.status_code in [201, 202]:
            print(f"✅ ВЕБХУК ПРИНЯЛ ЗАПРОС (код {response.status_code})")
            return True
        else:
            print(f"⚠️  ВЕБХУК ВЕРНУЛ КОД {response.status_code}")
            return False
        print("=" * 60)
        
    except requests.exceptions.Timeout:
        print("\n❌ ОШИБКА: Превышено время ожидания ответа (10 секунд)")
        print("   Возможно, сервер перегружен или недоступен")
        return False
    except requests.exceptions.ConnectionError as e:
        print(f"\n❌ ОШИБКА ПОДКЛЮЧЕНИЯ: {e}")
        print("\nВозможные причины:")
        print("  1. Сервер недоступен")
        print("  2. Неправильный URL")
        print("  3. Проблемы с сетью")
        print("  4. DNS не разрешается")
        return False
    except requests.exceptions.RequestException as e:
        print(f"\n❌ ОШИБКА ЗАПРОСА: {e}")
        return False
    except Exception as e:
        print(f"\n❌ НЕОЖИДАННАЯ ОШИБКА: {type(e).__name__}: {e}")
        return False

if __name__ == "__main__":
    # Проверка DNS
    hostname = "n8n.zakazhi.org"
    print("Проверка DNS разрешения...")
    dns_ok = test_dns_resolution(hostname)
    
    if not dns_ok:
        print("\n⚠️  ВНИМАНИЕ: DNS не разрешается.")
        print("   Это может быть:")
        print("   - Внутренний домен (требуется VPN)")
        print("   - Домен еще не настроен")
        print("   - Проблемы с DNS сервером")
        print("\nПродолжаем тест вебхука...")
    
    # Тестовый заказ
    test_order = {
        "items": [
            {
                "id": 1,
                "name": "Тестовое блюдо 1",
                "price": 500,
                "quantity": 2
            },
            {
                "id": 2,
                "name": "Тестовое блюдо 2",
                "price": 750,
                "quantity": 1
            }
        ],
        "total": 1750,
        "timestamp": datetime.now().isoformat()
    }
    
    # Тест вебхука
    result = test_webhook(test_order)
    
    print("\n" + "=" * 60)
    print("РЕЗУЛЬТАТ ТЕСТИРОВАНИЯ")
    print("=" * 60)
    if result:
        print("✅ Вебхук работает и принимает заказы")
    else:
        print("❌ Вебхук недоступен или возвращает ошибку")
        print("\nРекомендации:")
        print("1. Проверьте доступность сервера n8n.zakazhi.org")
        print("2. Убедитесь, что вебхук настроен в n8n")
        print("3. Проверьте правильность URL вебхука")
        print("4. Если это внутренний сервер, используйте VPN")
    print("=" * 60)

