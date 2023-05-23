import './burger.js';
import './slider.js';

console.groupCollapsed('Реализация burger menu на обеих страницах: +26');
  console.log('при ширине страницы меньше 768рх панель навигации скрывается, появляется бургер-иконка: +2');
  console.log('при нажатии на бургер-иконку, справа плавно появляется адаптивное меню шириной 320px, бургер-иконка плавно поворачивается на 90 градусов: +4');
  console.log('высота адаптивного меню занимает всю высоту экрана: +2');
  console.log('при повторном нажатии на бургер-иконку или на свободное от бургер-меню пространство адаптивное меню плавно скрывается уезжая за правую часть экрана, бургер-иконка плавно поворачивается обратно: +4');
  console.log('бургер-иконка создана при помощи html+css, без использования изображений: +2');
  console.log('ссылки в адаптивном меню работают: +2');
  console.log('при клике по ссылке в адаптивном меню адаптивное меню плавно скрывается вправо, бургер-иконка поворачивается на 90 градусов обратно: +2');
  console.log('бургер-меню соответствует макету (центрирование по вертикали и горизонтали элементов меню, расположение иконки): +2');
  console.log('область, свободная от бургер-меню, затемняется: +2');
  console.log('страница под бургер-меню не прокручивается: +4');
console.groupEnd('Реализация burger menu на обеих страницах: +26');

console.groupCollapsed('Реализация слайдера-карусели на странице Main: +36');
  console.log('при нажатии на стрелки происходит переход к новому блоку элементов: +4');
  console.log('смена блоков происходит с соответствующей анимацией карусели: +4');
  console.log('слайдер бесконечен: +4');
  console.log('при переключении прокручивается ровно столько карточек, сколько показывается при текущей ширине экрана: +4');
  console.log('в текущем блоке слайда карточки с питомцами не повторяются: +4');
  console.log('в следующем блоке нет дублирования карточек с текущим блоком: +4');
  console.log('сохраняется только одно предыдущее состояние: +4');
  console.log('при каждой перезагрузке страницы формируется новая последовательность карточек: +2');
  console.log('генерация наборов карточек происходит на основе 8 объектов с данными о животными: +2');
  console.log('при изменении ширины экрана слайдер перестраивается и работает без перезагрузки страницы: +4');
console.groupEnd('Реализация слайдера-карусели на странице Main');

console.groupCollapsed('Реализация попап на обеих страницах: +12');
  console.log('попап появляется при нажатии на любое место карточки с описанием конкретного животного: +2');
  console.log('часть страницы вне попапа затемняется: +2');
  console.log('при открытии попапа вертикальный скролл страницы становится неактивным, при закрытии - снова активным: +2');
  console.log('при нажатии на область вокруг попапа или на кнопку с крестиком попап закрывается, при этом при нажатии на сам попап ничего не происходит: +2');
  console.log('кнопка с крестиком интерактивная: +2');
  console.log('окно попапа (не считая кнопку с крестиком) центрировано по всем осям, размеры элементов попапа и их расположение совпадают с макетом: +2');
console.groupEnd('Реализация попап на обеих страницах: +12');

console.groupCollapsed('Реализация пагинации на странице Pets: +36');
  console.log('при перезагрузке страницы всегда открывается первая страница пагинации: +2');
  console.log('при нажатии кнопок > или < открывается следующая или предыдущая страница пагинации соответственно: +2');
  console.log('при нажатии кнопок >> или << открывается последняя или первая страница пагинации соответственно: +2');
  console.log('при открытии первой страницы кнопки << и < неактивны: +2');
  console.log('при открытии последней страницы кнопки > и >> неактивны: +2');
  console.log('в кружке по центру указан номер текущей страницы. При переключении страниц номер меняется на актуальный: +2');
  console.log('при загрузке страницы формируется массив из 48 объектов питомцев. Каждый из 8 питомцев должен встречаться ровно 6 раз: +4');
  console.log('при каждой перезагрузке страницы формируется новый массив со случайной последовательностью: +4');
  console.log('карточки питомцев не должны повторяться на одной странице: +4');
  console.log('при переключении страницы данные меняются (для >1280px меняется порядок карточек, для остальных - меняется набор и порядок карточек): +4');
  console.log('при неизменных размерах области пагинации, в том числе размерах окна браузера, и без перезагрузки страницы, возвращаясь на страницу под определенным номером, контент на ней всегда будет одинаков. Т.е. карточки питомцев будут в том же расположении, что и были до перехода на другие страницы: +2');
  console.log('общее количество страниц при ширине экрана 1280px - 6, при 768px - 8, при 320px - 16 страниц: +2');
  console.log('при изменении ширины экрана (от 1280px до 320px и обратно), пагинация перестраивается и работает без перезагрузки страницы: +4');
console.groupEnd('Реализация пагинации на странице Pets: +36');

console.log(
  '%cВсего: 110 / 110',
  'font-weight: 600; font-size: 16px;'
);
console.log(
  '%cДля удобства проверки я оставила консоль логи с состоянием слайдера и пагинации при каждом переключении слайда / страницы',
  'font-weight: 600; font-size: 14px;'
);