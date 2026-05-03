let index = 0;

/* ===== SLIDER SCOPE (IMPORTANT FIX) ===== */
const slider = document.querySelector(".slider");
const slides = document.querySelectorAll(".slider .card");
const dotsContainer = document.querySelector(".dots");

let startX = 0;

/* ===== SAFETY CHECK (biar tidak error kalau element hilang) ===== */
if (!slider || slides.length === 0) {
    console.warn("Slider tidak ditemukan atau kosong");
}

/* ===== DOT GENERATION ===== */
slides.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");

    dot.addEventListener("click", () => goTo(i));

    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll(".dot");

/* ===== UPDATE STATE ===== */
function update() {
    slides.forEach((slide, i) => {
        slide.classList.remove("active");

        if (dots[i]) {
            dots[i].classList.remove("active");
        }
    });

    slides[index].classList.add("active");

    if (dots[index]) {
        dots[index].classList.add("active");
    }
}

/* ===== NAVIGATION ===== */
function next() {
    index = (index + 1) % slides.length;
    update();
}

function prev() {
    index = (index - 1 + slides.length) % slides.length;
    update();
}

function goTo(i) {
    index = i;
    update();
}

/* ===== BUTTON CONTROL (SAFE BINDING) ===== */
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

if (nextBtn) nextBtn.onclick = next;
if (prevBtn) prevBtn.onclick = prev;

/* ===== AUTO LOOP ===== */
let autoPlay = setInterval(next, 5000);

/* ===== PAUSE ON HOVER (UX PREMIUM IMPROVEMENT) ===== */
slider.addEventListener("mouseenter", () => {
    clearInterval(autoPlay);
});

slider.addEventListener("mouseleave", () => {
    autoPlay = setInterval(next, 5000);
});

/* ===== SWIPE SUPPORT (MOBILE NATURAL FEEL) ===== */
slider.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
});

slider.addEventListener("touchend", e => {
    let endX = e.changedTouches[0].clientX;

    if (startX - endX > 50) next();
    if (endX - startX > 50) prev();
});

/* ===== INITIAL STATE ===== */
update();