<?php
// Устанавливаем путь к лог-файлу
$logFile = 'feedback_log.txt';

// Получаем данные из формы
$name = isset($_POST['name']) ? trim($_POST['name']) : '';
$website = isset($_POST['website']) ? trim($_POST['website']) : '';
$phone = isset($_POST['phone']) ? trim($_POST['phone']) : '';

// Функция для проверки валидности URL
function validateUrl($url)
{
    return filter_var($url, FILTER_VALIDATE_URL) !== false;
}

// Функция для проверки валидности телефона (простой пример)
function validatePhone($phone)
{
    return preg_match('/^\+?\d{10,15}$/', $phone);
}

// Создаем массив для ошибок
$errors = [];

// Проверка имени
if (empty($name)) {
    $errors[] = 'Имя обязательно';
}

// Проверка сайта
if (!empty($website) && !validateUrl($website)) {
    $errors[] = 'Введите действительный URL';
}

// Проверка телефона
if (!empty($phone) && !validatePhone($phone)) {
    $errors[] = 'Введите действительный номер телефона';
}

// Если есть ошибки, отправляем их обратно
if (!empty($errors)) {
    echo json_encode(['success' => false, 'errors' => $errors]);
    exit;
}

// Формируем строку для записи в лог-файл
$logEntry = sprintf(
    "[%s] Имя: %s, Сайт: %s, Телефон: %s\n",
    date('Y-m-d H:i:s'),
    htmlspecialchars($name),
    htmlspecialchars($website),
    htmlspecialchars($phone)
);

// Записываем данные в лог-файл
file_put_contents($logFile, $logEntry, FILE_APPEND | LOCK_EX);

// Отправляем успешный ответ
echo json_encode(['success' => true, 'message' => 'Форма успешно отправлена!']);
?>