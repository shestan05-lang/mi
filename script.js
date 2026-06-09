/* =================================================================
   Скрипты сайта-портфолио
   1) Плавная прокрутка к ценам (и другим якорям)
   2) Появление блоков при прокрутке
   3) Единая замена контактов в одном месте (CONTACTS)
   ================================================================= */

/* -----------------------------------------------------------------
   1) КОНТАКТЫ — поменяйте значения здесь, и они подставятся везде.
   Если оставить значение пустым (''), ссылки в HTML не изменятся,
   и будут использованы те, что прописаны прямо в index.html.
   ----------------------------------------------------------------- */
const CONTACTS = {
  telegram: 'https://t.me/r1mans',   // ваш Telegram
  whatsapp: '',                      // напр. 'https://wa.me/79990000000'
  name:     'Андрей',                // ваше имя
  city:     'Краснодар'              // ваш город
};

// Подставляем контакты в элементы с data-атрибутами
function applyContacts() {
  if (CONTACTS.telegram) {
    document.querySelectorAll('[data-telegram]').forEach(function (el) {
      el.setAttribute('href', CONTACTS.telegram);
    });
  }
  if (CONTACTS.whatsapp) {
    document.querySelectorAll('[data-whatsapp]').forEach(function (el) {
      el.setAttribute('href', CONTACTS.whatsapp);
    });
  }
  if (CONTACTS.name) {
    document.querySelectorAll('[data-name]').forEach(function (el) {
      el.textContent = CONTACTS.name;
    });
  }
  if (CONTACTS.city) {
    document.querySelectorAll('[data-city]').forEach(function (el) {
      el.textContent = CONTACTS.city;
    });
  }
}

/* -----------------------------------------------------------------
   2) Плавная прокрутка к ценам / якорям с классом .js-scroll
   ----------------------------------------------------------------- */
function initSmoothScroll() {
  document.querySelectorAll('.js-scroll').forEach(function (link) {
    link.addEventListener('click', function (event) {
      const targetId = link.getAttribute('href');
      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();
      // Учитываем высоту липкой шапки (66px)
      const offset = 70;
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });
}

/* -----------------------------------------------------------------
   3) Плавное появление блоков при прокрутке (.reveal -> .is-visible)
   ----------------------------------------------------------------- */
function initReveal() {
  const items = document.querySelectorAll('.reveal');

  // Если IntersectionObserver не поддерживается — просто показываем всё
  if (!('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  items.forEach(function (el) { observer.observe(el); });
}

/* -----------------------------------------------------------------
   4) FAQ-аккордеон (раскрытие ответа по клику)
   ----------------------------------------------------------------- */
function initFaq() {
  document.querySelectorAll('[data-faq] .faq-item').forEach(function (item) {
    const btn = item.querySelector('.faq-q');
    if (!btn) return;
    btn.addEventListener('click', function () {
      const isOpen = item.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(isOpen));
    });
  });
}

/* -----------------------------------------------------------------
   Запуск после загрузки DOM
   ----------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', function () {
  applyContacts();
  initSmoothScroll();
  initReveal();
  initFaq();
});
