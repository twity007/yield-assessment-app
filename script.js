// script.js
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('cropForm');
    const errorDiv = document.getElementById('errorMessage');
    const resultSection = document.getElementById('resultSection');

    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Предотвращаем перезагрузку страницы

        // Сброс предыдущих ошибок и результатов
        errorDiv.style.display = 'none';
        resultSection.style.display = 'none';
        errorDiv.textContent = '';

        // Получение значений
        const culture = document.getElementById('culture').value;
        const area = parseFloat(document.getElementById('area').value);
        const yieldPerHa = parseFloat(document.getElementById('yieldPerHa').value);
        const lossPercent = parseFloat(document.getElementById('lossPercent').value);
        const price = parseFloat(document.getElementById('price').value);

        // Валидация
        let errors = [];

        if (!culture) {
            errors.push("Пожалуйста, выберите культуру.");
        }
        if (isNaN(area) || area <= 0) {
            errors.push("Площадь участка должна быть положительным числом.");
        }
        if (isNaN(yieldPerHa) || yieldPerHa <= 0) {
            errors.push("Урожайность должна быть положительным числом.");
        }
        if (isNaN(lossPercent) || lossPercent < 0 || lossPercent > 100) {
            errors.push("Процент потерь должен быть числом от 0 до 100.");
        }
        if (isNaN(price) || price < 0) {
            errors.push("Цена реализации не может быть отрицательной.");
        }

        // Если есть ошибки, выводим их
        if (errors.length > 0) {
            errorDiv.textContent = errors.join(' ');
            errorDiv.style.display = 'block';
            return;
        }

        // Расчеты
        // 1. Валовой урожай (кг) = Площадь (га) * Урожайность (кг/га)
        const grossYieldKg = area * yieldPerHa;

        // 2. Потери (кг) = Валовой урожай * (Процент / 100)
        const lossesKg = grossYieldKg * (lossPercent / 100);

        // 3. Итоговый урожай (кг) = Валовой урожай - Потери
        const netYieldKg = grossYieldKg - lossesKg;

        // 4. Выручка (руб) = Итоговый урожай (кг) * Цена (руб/кг)
        const revenueRub = netYieldKg * price;

        // Форматирование чисел (округление до 2 знаков после запятой)
        const formatNum = (num) => num.toFixed(2);

        // Вывод входных данных в сводку
        document.getElementById('resCulture').textContent = culture;
        document.getElementById('resArea').textContent = area;
        document.getElementById('resYield').textContent = yieldPerHa;
        document.getElementById('resLossPercent').textContent = lossPercent;
        document.getElementById('resPrice').textContent = price;

        // Вывод результатов в таблицу
        document.getElementById('valGross').textContent = `${formatNum(grossYieldKg)} кг`;
        document.getElementById('valLosses').textContent = `${formatNum(lossesKg)} кг`;
        document.getElementById('valNet').textContent = `${formatNum(netYieldKg)} кг`;
        document.getElementById('valRevenue').textContent = `${formatNum(revenueRub)} руб`;

        // Показываем блок с результатами
        resultSection.style.display = 'block';

        // Прокрутка к результатам (для мобильных устройств)
        resultSection.scrollIntoView({ behavior: 'smooth' });
    });
});