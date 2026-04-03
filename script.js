const toggle = document.getElementById('menu-toggle');
const menu = document.getElementById('nav-links');

if (toggle && menu) {
  toggle.addEventListener('click', () => {
    menu.classList.toggle('show');
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
  });
}

const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Bedankt voor je bericht! We nemen snel contact op.');
    this.reset();
  });
}

async function loadChatKit() {
  const container = document.getElementById('chat-container');
  if (!container) return;

  try {
    const response = await fetch('http://127.0.0.1:8000/api/chatkit/session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      container.innerHTML = '<p>Kon de chat niet laden.</p>';
      console.error('Kon geen ChatKit-sessie ophalen:', response.status);
      return;
    }

    const { client_secret } = await response.json();
    console.log('Client secret ontvangen:', client_secret);

    // Tijdelijke zichtbare test
    container.innerHTML = '<p>ChatKit-sessie geladen.</p>';
  } catch (error) {
    container.innerHTML = '<p>Fout bij het laden van de chat.</p>';
    console.error(error);
  }
}

window.addEventListener('load', loadChatKit);