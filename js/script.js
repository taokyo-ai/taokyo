// Fan: coverflow-effect gestuurd door scrollen
const fanWrap = document.querySelector(".fan-wrap");
const fanCards = Array.from(document.querySelectorAll(".fan-track .fan-card"));

const FAN_SPACING = 130;
const FAN_MAX_ROTATE = 22;
const FAN_MAX_DIST = 4;
const FAN_RANGE_FACTOR = 2.2;

let fanTicking = false;

function updateFanCoverflow() {
  fanTicking = false;
  if (!fanWrap || fanCards.length === 0) return;

  const rect = fanWrap.getBoundingClientRect();
  const viewportCenter = window.innerHeight / 2;
  const range = rect.height * FAN_RANGE_FACTOR;
  const rawProgress = (viewportCenter - rect.top + range / 2) / range;
  const activeIndex = Math.min(Math.max(rawProgress, 0), 1) * (fanCards.length - 1);

  fanCards.forEach((card, i) => {
    if (card.classList.contains("is-clicked")) return;
    const d = i - activeIndex;
    const absD = Math.abs(d);

    const x = d * FAN_SPACING;
    const y = Math.min(absD * 18, 70);
    const rotate = Math.max(-FAN_MAX_ROTATE, Math.min(FAN_MAX_ROTATE, d * 14));
    const scale = Math.max(0.55, 1 - absD * 0.14);
    const opacity = Math.max(0.15, 1 - absD / FAN_MAX_DIST);
    const z = Math.round(100 - absD * 10);

    card.style.transform = `translate(${x}px, ${y}px) rotate(${rotate}deg) scale(${scale})`;
    card.style.opacity = opacity;
    card.style.zIndex = z;
  });
}

function requestFanUpdate() {
  if (!fanTicking) {
    fanTicking = true;
    requestAnimationFrame(updateFanCoverflow);
  }
}

window.addEventListener("scroll", requestFanUpdate);
window.addEventListener("resize", requestFanUpdate);
updateFanCoverflow();

fanCards.forEach((card) => {
  card.addEventListener("click", function (e) {
    const opensNewTab = this.target === "_blank";
    this.classList.add("is-clicked");
    const current = this.style.transform || "";
    this.style.transform = current + " scale(1.15)";
    this.style.zIndex = 200;

    if (!opensNewTab) {
      e.preventDefault();
      const href = this.href;
      setTimeout(() => { window.location.href = href; }, 180);
    } else {
      setTimeout(() => this.classList.remove("is-clicked"), 350);
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
