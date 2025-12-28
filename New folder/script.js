// --- 1. Background Hearts (Universal) ---
function createHeart() {
    const container = document.getElementById('global-hearts');
    if (!container) return;
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (Math.random() * 5 + 5) + 's';
    heart.style.fontSize = (Math.random() * 10 + 15) + 'px';
    container.appendChild(heart);
    setTimeout(() => heart.remove(), 10000);
}
setInterval(createHeart, 600);

// --- 2. Page 1: Counter Logic ---
const counterEl = document.getElementById('month-counter');
if (counterEl) {
    let count = 0;
    const interval = setInterval(() => {
        if (count < 1) {
            count++;
            counterEl.innerText = count;
        } else clearInterval(interval);
    }, 500);
}

// --- 3. Page 2: Timeline Logic ---
const timelineItems = document.getElementById('timeline-items');
if (timelineItems) {
    const data = [
        { month: 1, title: "Week 1", text: "1st week ito yung sabik akong halikan ka HAHAHAH", emoji: "🎉" },
        { month: 2, title: "Week 2", text: "2nd week uhmmm inlove lng ako sayo yieeeee HAHAHA", emoji: "💫" },
        { month: 3, title: "Week 3", text: "3rd week sinulit ko na talagang makasama ka kasi aalis ka na huhuhuh", emoji: "☕" },
        { month: 4, title: "Week 4", text: "4th week miss na kita sobra yung tipong gusto na kita puntahan ngay HAHAHAHAH", emoji: "✨" }
    ];

    let activeIdx = 0;
    const render = () => {
        timelineItems.innerHTML = data.map((item, i) => `
            <div class="tl-item ${i % 2 === 0 ? 'left' : 'right'} ${i === activeIdx ? 'active' : ''}">
                <div class="tl-circle">${item.month}</div>
                <div class="tl-card">
                    <h3>${item.emoji} ${item.title}</h3>
                    <p>${item.text}</p>
                </div>
            </div>
        `).join('');
    };

    render();
    setInterval(() => {
        activeIdx = (activeIdx + 1) % data.length;
        render();
    }, 3000);
}



if (galleryGrid) {
    galleryGrid.innerHTML = memories.map((m, i) => `
        <div class="polaroid" onclick="openLightbox(${i})">
            <div class="tape"></div>
            <img src="${m.src}">
            <div class="pol-cap">
                <small>${m.week}</small>
                <p>${m.cap}</p>
            </div>
        </div>
    `).join('');
}

let currentIdx = 0;
window.openLightbox = (i) => {
    currentIdx = i;
    const modal = document.getElementById('lightbox');
    document.getElementById('modal-img').src = memories[i].src;
    document.getElementById('modal-week').innerText = memories[i].week;
    document.getElementById('modal-text').innerText = memories[i].cap;
    modal.style.display = 'flex';
};

window.closeLightbox = () => {
    document.getElementById('lightbox').style.display = 'none';
};

window.changeLightbox = (dir) => {
    currentIdx = (currentIdx + dir + memories.length) % memories.length;
    openLightbox(currentIdx);
};