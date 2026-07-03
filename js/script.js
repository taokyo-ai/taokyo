// Fan: draaien bij scrollen
const fanTrack = document.querySelector(".fan-track");
if (fanTrack) {
  let ticking = false;
  function updateFanRotation() {
    const angle = Math.min(window.scrollY * 0.08, 40); // max 40 graden
    fanTrack.style.transform = `rotate(${angle}deg)`;
    ticking = false;
  }
  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(updateFanRotation);
      ticking = true;
    }
  });
  updateFanRotation();
}

// Fan: kaartje iets laten groeien bij klikken, dan doorsturen
document.querySelectorAll(".fan-card").forEach((card) => {
  card.addEventListener("click", function (e) {
    const opensNewTab = this.target === "_blank";
    this.classList.add("is-active");

    if (!opensNewTab) {
      e.preventDefault();
      const href = this.href;
      setTimeout(() => { window.location.href = href; }, 180);
    } else {
      setTimeout(() => this.classList.remove("is-active"), 350);
    }
  });
});

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

// Filteren op type
const filterBtns = document.querySelectorAll(".filter-btn");
const cards = document.querySelectorAll(".kb-card");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;
    cards.forEach((card) => {
      const show = filter === "all" || card.dataset.type === filter;
      card.classList.toggle("hidden", !show);
    });
  });
});

// Modal
const overlay = document.getElementById("modalOverlay");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalTag = document.getElementById("modalTag");
const modalMedia = document.getElementById("modalMedia");
const modalClose = document.getElementById("modalClose");

cards.forEach((card) => {
  card.addEventListener("click", () => {
    modalTitle.textContent = card.dataset.title;
    modalDesc.textContent = card.dataset.desc;
    modalTag.textContent = card.dataset.type === "video" ? "Video" : "Artikel";

    if (card.dataset.type === "video") {
      modalMedia.classList.add("show");
      modalMedia.innerHTML = '<span style="font-size:13px;color:#888;">Video wordt hier afgespeeld</span>';
    } else {
      modalMedia.classList.remove("show");
      modalMedia.innerHTML = "";
    }

    overlay.classList.add("open");
  });
});

function closeModal() {
  overlay.classList.remove("open");
}

modalClose.addEventListener("click", closeModal);
overlay.addEventListener("click", (e) => {
  if (e.target === overlay) closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});
