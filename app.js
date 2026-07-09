// Database of 25 Premium Templates + 13 ShaadiPath Templates (Total 38 Premium layouts)
const demos = [
  // New ShaadiPath Traditional Indian wedding layouts (Copied & Integrated)
  {
    code: "376",
    id: "shaadipath-template01",
    title: "Shaadi Classic",
    tag: "Traditional Tanya",
    tier: "Luxury",
    categories: ["bestsellers", "indian", "traditional", "classical"],
    url: "demos/shaadipath-template01/source/",
    previewImg: "demos/shaadipath-template01/preview.png",
    description: "Ganesha blessings, paper-cut walking elephants transition, and custom multi-celebration Jodhpur timelines.",
    features: ["Traditional Ganesha icon blessing", "Elephant walk scroll transition", "Mehendi, Haldi & Sagan timeline", "Preloaded traditional Indian music loop", "WhatsApp RSVP questionnaire"]
  },
  {
    code: "377",
    id: "shaadipath-template02",
    title: "Rajputana Royal",
    tag: "Traditional Indian",
    tier: "Premium",
    categories: ["indian", "traditional"],
    url: "demos/shaadipath-template02/source/",
    previewImg: "demos/shaadipath-template02/preview.png",
    description: "A gorgeous Rajputana fortress theme with bright saffron watercolor floral details and elegant Hindi-English fonts.",
    features: ["Rajasthan palace watercolor art", "Golden toran framing banners", "Multi-event timeline list", "Aesthetic photo grids", "Google Maps navigation link"]
  },
  {
    code: "378",
    id: "shaadipath-template03",
    title: "Mandap Gold",
    tag: "Traditional Luxury",
    tier: "Luxury",
    categories: ["indian", "traditional", "classical"],
    url: "demos/shaadipath-template03/source/",
    previewImg: "demos/shaadipath-template03/preview.png",
    description: "Mandap marigold visual accents, paper-cut gold filigree, and royal sans-serif lettering.",
    features: ["Marigold toran garlands details", "Golden mandala preloader trace", "Accommodations stays guide", "Sleek musical soundtrack player", "WhatsApp RSVP integration"]
  }
];

// lightweight review system
const reviewStorageKey = "kimiclawReviews";
const defaultReviews = [
  { name: "Aarav Mehta", rating: 5, review: "Beautiful invitation and very smooth delivery. The WhatsApp RSVP feature was a big hit with our guests.", createdAt: new Date(Date.now() - 86400000 * 2).toISOString() },
  { name: "Priya Sharma", rating: 5, review: "The design looked premium on mobile and desktop. Really impressed with the polish and attention to detail.", createdAt: new Date(Date.now() - 86400000 * 5).toISOString() },
  { name: "Rohan Patel", rating: 4, review: "Great experience overall. The preview flow was clear and the team responded quickly to changes.", createdAt: new Date(Date.now() - 86400000 * 9).toISOString() }
];

function loadReviews() {
  try {
    const saved = JSON.parse(localStorage.getItem(reviewStorageKey) || "null");
    if (Array.isArray(saved) && saved.length) return saved;
  } catch (e) {}
  return [...defaultReviews];
}

function saveReviews(reviews) {
  localStorage.setItem(reviewStorageKey, JSON.stringify(reviews));
}

function timeAgo(iso) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${Math.max(1, mins)}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

function renderReviews() {
  const grid = document.querySelector("#reviews-grid");
  const statsRating = document.querySelector(".stat-item .stat-number");
  if (!grid) return;
  const reviews = loadReviews();
  const avg = reviews.reduce((sum, r) => sum + Number(r.rating || 0), 0) / Math.max(reviews.length, 1);
  const avgLabel = avg.toFixed(1);
  if (statsRating) statsRating.textContent = avgLabel;
  grid.innerHTML = reviews.slice(0, 6).map(review => `
    <article class="review-card">
      <div class="review-top">
        <div>
          <div class="review-name">${escapeHtml(review.name || "Guest")}</div>
          <div class="review-meta">${timeAgo(review.createdAt)}</div>
        </div>
        <div class="review-stars">${"★".repeat(review.rating || 5)}</div>
      </div>
      <div class="review-text">${escapeHtml(review.review || "")}</div>
    </article>
  `).join("");
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function showReviewToast(message) {
  const toast = document.querySelector("#review-toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2200);
}

function setupReviewSystem() {
  const modal = document.querySelector("#review-modal");
  const openBtn = document.querySelector("#open-review-btn");
  const cancelBtn = document.querySelector("#review-cancel-btn");
  const form = document.querySelector("#review-form");
  const ratingWrap = document.querySelector("#review-rating");
  const nameInput = document.querySelector("#review-name");
  const textInput = document.querySelector("#review-text");
  if (!modal || !openBtn || !cancelBtn || !form || !ratingWrap) return;

  let selectedRating = 5;

  const updateStars = () => {
    ratingWrap.querySelectorAll("button").forEach(btn => {
      const active = Number(btn.dataset.rating) <= selectedRating;
      btn.classList.toggle("active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });
  };

  const openModal = () => {
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    setTimeout(() => nameInput?.focus(), 50);
    updateStars();
  };

  const closeModal = () => {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    form.reset();
    selectedRating = 5;
    updateStars();
  };

  openBtn.addEventListener("click", openModal);
  cancelBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && modal.classList.contains("open")) closeModal(); });

  ratingWrap.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", () => {
      selectedRating = Number(btn.dataset.rating || 5);
      updateStars();
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = (nameInput?.value || "").trim();
    const review = (textInput?.value || "").trim();

    if (!name) return showReviewToast("Please enter your name.");
    if (review.length < 20) return showReviewToast("Please write at least 20 characters.");

    const reviews = loadReviews();
    reviews.unshift({ name, rating: selectedRating, review, createdAt: new Date().toISOString() });
    saveReviews(reviews);
    renderReviews();
    closeModal();
    showReviewToast("✅ Thank you for your review!");
  });

  updateStars();
}

function initUIFixes() {
  const nav = document.querySelector("#nav-menu");
  const hamburger = document.querySelector("#hamburger-btn");
  if (nav && hamburger) {
    document.querySelectorAll(".nav-link").forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        hamburger.classList.remove("open");
        hamburger.setAttribute("aria-expanded", "false");
      });
    });
  }
}

renderReviews();
setupReviewSystem();
initUIFixes();
