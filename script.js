document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        const images = document.querySelectorAll('img');
        let imageInfo = 'Изображения на странице:\n';
        images.forEach((img, index) => {
            imageInfo += `Изображение ${index + 1}: ${img.src}\n`;
        });
        alert(imageInfo);
    }, 5000);

    const link = document.createElement('a');
    link.href = 'https://www.youtube.com';
    link.textContent = 'Ссылка на Ваш любимый сайт';
    document.body.appendChild(link);

    document.getElementById('changeStyleBtn').addEventListener('click', function() {
        const img = document.getElementById('mainImage');
        img.style.width = '15%';
        img.style.border = '2px solid blue';
        img.style.position = 'absolute';
        img.style.bottom = '0';
        img.style.left = '0';
    });

    const browserInfo = `Браузер: ${navigator.userAgent}`;
    const infoDiv = document.createElement('div');
    infoDiv.textContent = browserInfo;
    document.body.appendChild(infoDiv);

    document.getElementById('registrationForm').addEventListener('submit', function(event) {
        event.preventDefault();
        let isValid = true;

        document.querySelectorAll('.error-message').forEach(e => e.remove());

        document.querySelectorAll('.error').forEach(e => e.classList.remove('error'));

        const validateField = (field, message, minLength = 0, maxLength = Infinity, regex = null) => {
            const value = field.value.trim();
            if (!value) {
                field.classList.add('error');
                field.insertAdjacentHTML('afterend', `<div class="error-message">${message} не должно быть пустым.</div>`);
                isValid = false;
            } else if (value.length < minLength || value.length > maxLength) {
                field.classList.add('error');
                field.insertAdjacentHTML('afterend', `<div class="error-message">${message} должно быть от ${minLength} до ${maxLength} символов.</div>`);
                isValid = false;
            } else if (regex && !regex.test(value)) {
                field.classList.add('error');
                field.insertAdjacentHTML('afterend', `<div class="error-message">${message} содержит недопустимые символы.</div>`);
                isValid = false;
            }
        };

        const surname = document.getElementById('surname');
        const name = document.getElementById('name');
        const patronymic = document.getElementById('patronymic');
        const noPatronymic = document.getElementById('no-patronymic');
        const gender = document.querySelector('input[name="gender"]:checked');
        const birthdate = document.getElementById('birthdate');
        const captcha = document.getElementById('captcha');

        const nameRegex = /^[A-Za-zА-Яа-яЁё\s-]+$/; 
        
        validateField(surname, 'Фамилия', 2, 50, nameRegex);
        validateField(name, 'Имя', 2, 50, nameRegex);
        if (!patronymic.value && !noPatronymic.checked) {
            patronymic.classList.add('error');
            patronymic.insertAdjacentHTML('afterend', `<div class="error-message">Отчество обязательно для заполнения или выберите "У меня нет отчества".</div>`);
            isValid = false;
        } else if (patronymic.value) {
            validateField(patronymic, 'Отчество', 2, 50, nameRegex);
        }
        if (!gender) {
            document.querySelector('.gender').insertAdjacentHTML('beforeend', `<div class="error-message">Пол обязательно для выбора.</div>`);
            isValid = false;
        }
        if (!birthdate.value) {
            birthdate.classList.add('error');
            birthdate.insertAdjacentHTML('afterend', `<div class="error-message">Дата рождения обязательно для заполнения.</div>`);
            isValid = false;
        }
        validateField(captcha, 'Капча', 4, 6);

        if (isValid) {
            alert('Форма успешно отправлена!');
            document.getElementById('registrationForm').reset();
        }
    });
});
