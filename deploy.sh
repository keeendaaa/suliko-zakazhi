#!/bin/bash

# Параметры подключения
SERVER="92.255.79.122"
USER="root"
PASSWORD="j6NJuUz^JBu+vr"
REMOTE_PATH="/var/www/yourgos"
LOCAL_PATH="./suliko/build"

echo "Создаем директорию на сервере..."
sshpass -p "$PASSWORD" ssh -o StrictHostKeyChecking=no $USER@$SERVER "mkdir -p $REMOTE_PATH"

echo "Загружаем файлы на сервер..."
sshpass -p "$PASSWORD" scp -r -o StrictHostKeyChecking=no $LOCAL_PATH/* $USER@$SERVER:$REMOTE_PATH/

echo "Проверяем загруженные файлы..."
sshpass -p "$PASSWORD" ssh -o StrictHostKeyChecking=no $USER@$SERVER "ls -la $REMOTE_PATH"

echo "Деплой завершен!"

