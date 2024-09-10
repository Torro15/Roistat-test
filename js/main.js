// реализация мобильного меню

document.addEventListener('DOMContentLoaded', function () {
    const burgerMenu = document.getElementById('burgerMenu');
    const sideMenu = document.getElementById('sideMenu');
    const closeBtn = document.getElementById('closeBtn');

    // Открытие бокового меню
    burgerMenu.addEventListener('click', function () {
        sideMenu.style.right = '0';
    });

    // Закрытие бокового меню
    closeBtn.addEventListener('click', function () {
        sideMenu.style.right = '-250px';
    });

    // Закрытие бокового меню при клике вне его
    document.addEventListener('click', function (event) {
        if (!sideMenu.contains(event.target) && !burgerMenu.contains(event.target)) {
            sideMenu.style.right = '-250px';
        }
    });
});

// Реализация модального окна с формой

document.addEventListener('DOMContentLoaded', function () {
    // Получаем элементы
    const modal = document.getElementById("modal");
    const openModalBtn = document.getElementById("openModalBtn");
    const closeModalBtn = document.getElementById("closeModalBtn");
    const form = document.getElementById('contactForm');

    // Открытие модального окна
    openModalBtn.addEventListener("click", () => {
        modal.classList.add("show");
    });

    // Закрытие модального окна
    closeModalBtn.addEventListener("click", () => {
        modal.classList.remove("show");
    });

    // Закрытие модального окна при клике вне формы
    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.classList.remove("show");
        }
    });

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Предотвращает отправку формы по умолчанию

        // Сброс ошибок
        const nameError = document.getElementById('nameError');
        const websiteError = document.getElementById('websiteError');
        const phoneError = document.getElementById('phoneError');

        nameError.textContent = '';
        websiteError.textContent = '';
        phoneError.textContent = '';

        // Получаем значения полей
        const name = form.name.value.trim();
        const website = form.website.value.trim();
        const phone = form.phone.value.trim();

        let isValid = true;

        // Проверка имени
        if (name === '') {
            nameError.textContent = 'Имя обязательно';
            isValid = false;
        }

        // Проверка сайта
        if (website !== '' && !validateUrl(website)) {
            websiteError.textContent = 'Введите действительный URL';
            isValid = false;
        }

        // Проверка телефона
        if (phone !== '' && !validatePhone(phone)) {
            phoneError.textContent = 'Введите действительный номер телефона';
            isValid = false;
        }

        if (isValid) {
            // В случае успешной проверки данных можно отправить форму
            alert('Форма успешно отправлена!');
            // В реальном приложении вы могли бы отправить данные на сервер здесь
            form.reset(); // Сброс формы после успешной отправки
        }
    });

    function validateUrl(url) {
        // Проверка валидности URL
        const re = /^(https?:\/\/)?([\w\d-]+\.)+[\w\d]{2,}(\/[\w\d#?=&]*)?$/i;
        return re.test(url);
    }

    function validatePhone(phone) {
        // Проверка валидности номера телефона
        const re = /^\+?\d{10,15}$/;
        return re.test(phone);
    }
});

// Интеграция PHP запроса с формой
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        // Создаем объект FormData для отправки данных формы
        const formData = new FormData(form);

        // Создаем запрос AJAX
        fetch('process_form.php', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert(data.message);
                    form.reset();
                } else {
                    alert('Ошибки: \n' + data.errors.join('\n'));
                }
            })
            .catch(error => console.error('Ошибка:', error));
    });
});

