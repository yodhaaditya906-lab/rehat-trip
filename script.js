document.addEventListener("DOMContentLoaded", () => {
  // 1. Mobile navigation toggle
  const navToggle = document.querySelector(".nav-toggle");
  const primaryNav = document.querySelector(".primary-nav");

  if (navToggle && primaryNav) {
    navToggle.addEventListener("click", () => {
      const expanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!expanded));
      primaryNav.classList.toggle("is-open", !expanded);
    });

    primaryNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navToggle.setAttribute("aria-expanded", "false");
        primaryNav.classList.remove("is-open");
      });
    });
  }

  // 2. Savings simulator (estimasi Rp8.000/hari)
  const DAILY_ESTIMATE = 8000;
  const daysRange = document.getElementById("days-range");
  const daysOutput = document.getElementById("days-output");
  const daysCalc = document.getElementById("days-calc");
  const savingsTotal = document.getElementById("savings-total");
  const weeklyNote = document.getElementById("weekly-note");
  const presetBtns = document.querySelectorAll(".preset-btn");

  const formatRupiah = (amount) =>
    "Rp" + amount.toLocaleString("id-ID");

  const updateSimulator = (days) => {
    const safeDays = Number(days) || 60;
    const total = safeDays * DAILY_ESTIMATE;
    const weekly = DAILY_ESTIMATE * 7;

    if (daysRange) daysRange.value = String(safeDays);
    if (daysOutput) daysOutput.textContent = `${safeDays} hari`;
    if (daysCalc) daysCalc.textContent = String(safeDays);
    if (savingsTotal) savingsTotal.textContent = formatRupiah(total);
    if (weeklyNote) {
      weeklyNote.textContent = `Atau sekitar ${formatRupiah(weekly)} per minggu`;
    }

    presetBtns.forEach((btn) => {
      const btnDays = Number(btn.getAttribute("data-days"));
      btn.classList.toggle("is-active", btnDays === safeDays);
    });
  };

  if (daysRange) {
    daysRange.addEventListener("input", (event) => {
      updateSimulator(event.target.value);
    });
  }

  presetBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      updateSimulator(btn.getAttribute("data-days"));
    });
  });

  updateSimulator(60);

  // 3. Trip schedule filter + jump links from Paths section
  const filterBtns = document.querySelectorAll(".filter-btn");
  const tripCards = document.querySelectorAll(".trip-card");

  const applyTripFilter = (category) => {
    filterBtns.forEach((btn) => {
      const active = btn.getAttribute("data-filter") === category;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-selected", String(active));
    });

    tripCards.forEach((card) => {
      const cardCat = card.getAttribute("data-category");
      const show = category === "all" || cardCat === category;
      card.hidden = !show;
    });
  };

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      applyTripFilter(btn.getAttribute("data-filter"));
    });
  });

  document.querySelectorAll("[data-filter-jump]").forEach((link) => {
    link.addEventListener("click", () => {
      const targetFilter = link.getAttribute("data-filter-jump");
      if (targetFilter) applyTripFilter(targetFilter);
    });
  });

  // 4. Pre-select trip package when clicking CTA on a trip card
  const selectedTripNote = document.getElementById("selected-trip-note");
  let chosenTripName = "";

  document.querySelectorAll("[data-trip-select]").forEach((btn) => {
    btn.addEventListener("click", () => {
      chosenTripName = btn.getAttribute("data-trip-select") || "";
      if (selectedTripNote && chosenTripName) {
        selectedTripNote.hidden = false;
        selectedTripNote.textContent = `Paket yang kamu pilih: ${chosenTripName}`;
      }
    });
  });

  // 5. FAQ Accordion
  const faqButtons = document.querySelectorAll(".faq-question");
  faqButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const expanded = btn.getAttribute("aria-expanded") === "true";
      const answer = btn.nextElementSibling;

      faqButtons.forEach((otherBtn) => {
        if (otherBtn !== btn) {
          otherBtn.setAttribute("aria-expanded", "false");
          if (otherBtn.nextElementSibling) {
            otherBtn.nextElementSibling.hidden = true;
          }
        }
      });

      btn.setAttribute("aria-expanded", String(!expanded));
      if (answer) {
        answer.hidden = expanded;
      }
    });
  });

  // 6. WhatsApp placeholder button handler
  const waBtn = document.getElementById("wa-action-btn");
  const waFeedback = document.getElementById("wa-feedback");

  if (waBtn && waFeedback) {
    waBtn.addEventListener("click", () => {
      const tripPart = chosenTripName ? ` mengenai "${chosenTripName}"` : "";
      waFeedback.textContent =
        `Placeholder: ganti [ISI NOMOR WHATSAPP] di index.html & script.js dengan nomor WA resmi (628xxx)${tripPart}.`;
    });
  }

  // 7. Footer current year
  const yearEl = document.getElementById("year-now");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
});
