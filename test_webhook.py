#!/usr/bin/env python3
"""
Тестовый скрипт для проверки вебхука заказов
"""
import requests
import json
from datetime import datetime

WEBHOOK_URL = 'https://n8n.zakazhi.org/webhook-test/order-suliko'

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

print("=" * 60)
print("Тестирование вебхука заказов")
print("=" * 60)
print(f"\nURL: {WEBHOOK_URL}")
print(f"\nТестовый заказ:")
print(json.dumps(test_order, indent=2, ensure_ascii=False))

try:
    print("\n" + "-" * 60)
    print("Отправка запроса...")
    print("-" * 60)
    
    response = requests.post(
        WEBHOOK_URL,
        json=test_order,
        headers={
            'Content-Type': 'application/json',
        },
        timeout=10
    )
    
    print(f"\nСтатус код: {response.status_code}")
    print(f"Заголовки ответа:")
    for key, value in response.headers.items():
        print(f"  {key}: {value}")
    
    print(f"\nТело ответа:")
    try:
        response_json = response.json()
        print(json.dumps(response_json, indent=2, ensure_ascii=False))
    except:
        print(response.text)
    
    print("\n" + "=" * 60)
    if response.status_code == 200:
        print("✅ ВЕБХУК РАБОТАЕТ КОРРЕКТНО!")
    else:
        print(f"⚠️  ВЕБХУК ВЕРНУЛ КОД {response.status_code}")
    print("=" * 60)
    
except requests.exceptions.Timeout:
    print("\n❌ ОШИБКА: Превышено время ожидания ответа")
except requests.exceptions.ConnectionError:
    print("\n❌ ОШИБКА: Не удалось подключиться к серверу")
except requests.exceptions.RequestException as e:
    print(f"\n❌ ОШИБКА: {e}")
except Exception as e:
    print(f"\n❌ НЕОЖИДАННАЯ ОШИБКА: {e}")

