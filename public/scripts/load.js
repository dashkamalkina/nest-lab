window.onload = function () {
  var loadTime =
    window.performance.timing.domContentLoadedEventEnd -
    window.performance.timing.navigationStart;

  let serverTime = +document.getElementById('serverTime').value;

  let podval = document.getElementById('time');
  podval.style.width = '100vw';
  podval.style.textAlign = 'center';
  podval.style.backgroundColor = '#eeee6e';
  podval.textContent = `Server time - ${serverTime} | Client time - ${loadTime - serverTime}`;
  let currentUrl = document.location;

  // Получаем все пункты меню
  let menuItems = document.querySelectorAll('.menu_element');
  // Перебираем все пункты меню
  console.log(menuItems);

  for (let i = 0; i < menuItems.length; i++) {
    // Получаем ссылку пункта меню
    console.log(menuItems[i], currentUrl['href'].includes(menuItems[i].href));
    // Проверяем, содержит ли ссылка текущий URL страницы
    if (currentUrl['href'].includes(menuItems[i].href)) {
      // Добавляем класс для активного состояния
      menuItems[i].classList.add('fq');
    }
  }
};
