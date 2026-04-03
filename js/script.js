document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');
  const button = document.getElementById('alertButton');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');

      const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!expanded));
    });
  }

  if (button) {
    button.addEventListener('click', () => {
      alert('Bedankt voor je interesse in Taokyo AI Collective! We nemen snel contact met je op.');
    });
  }
});
