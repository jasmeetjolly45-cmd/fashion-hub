const selectedState = {
    occasion: null,
    vibe: null,
    weather: null
};

const generateBtn = document.getElementById('generateBtn');
const defaultState = document.getElementById('defaultState');
const resultState = document.getElementById('resultState');
const outfitList = document.getElementById('outfitList');
const recipeTags = document.getElementById('recipeTags');
const styleTipText = document.getElementById('styleTipText');
const regenerateBtn = document.getElementById('regenerateBtn');

// Handle Pill Selection
document.querySelectorAll('.pill-container').forEach(container => {
    container.addEventListener('click', (e) => {
        const btn = e.target.closest('.pill-btn');
        if (!btn) return;

        const category = btn.dataset.category;
        const value = btn.dataset.value;

        container.querySelectorAll('.pill-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        selectedState[category] = value;

        if (selectedState.occasion && selectedState.vibe && selectedState.weather) {
            generateBtn.disabled = false;
        }
    });
});

// Expanded Comprehensive Component Pool for Variety
const pool = {
    tops: [
        "🤍 White fitted modal tee", "👔 Crisp poplin button-down shirt", "🕊️ Draping silk blouse", 
        "🖤 Fine-knit black turtleneck", "🤎 Cashmere crewneck sweater", "🤍 Linen resort button-up",
        "🖤 Asymmetrical sleeveless top", "🧶 Ribbed mock-neck knit", "🕊️ Satin cowl-neck camisole",
        "🤍 Oversized boyfriend oxford", "🤎 Structured knit polo", "🖤 Off-the-shoulder jersey top"
    ],
    bottoms: [
        "👖 Relaxed straight-leg denim", "🖤 Tailored pleated trousers", "🩰 Flowing satin midi skirt",
        "👖 Vintage wash wide-leg jeans", "🤎 Pleated crepe midi skirt", "👖 High-rise tailored trousers",
        "🖤 Leather-finish wrap skirt", "👖 Raw hem cropped denim", "🤍 Flowing linen palazzo pants",
        "🤎 Corduroy straight trousers", "🖤 Structured flare trousers", "👖 Ecru denim utility pants"
    ],
    layers: [
        "🧥 Minimal tailored trench coat", "🧥 Longline wool blend coat", "🧥 Oversized structured blazer",
        "🧥 Lightweight linen overshirt", "🧥 Double-breasted check blazer", "🧥 Cropped suede jacket",
        "🧥 Classic black leather jacket", "🧥 Soft knit wrap cardigan", "🧥 Weatherproof shell coat"
    ],
    footwear: [
        "👟 Clean leather white sneakers", "👞 Classic polished loafers", "👡 Sleek minimalist slide sandals",
        "👠 Pointed-toe heeled ankle boots", "🥿 Delicate strappy flat sandals", "👢 Knee-high leather riding boots",
        "🥾 Chunky minimal lug sole boots", "👟 Retro everyday runner sneakers", "👡 Strappy evening kitten heels"
    ],
    accessories: [
        "👜 Structured everyday leather tote", "✨ Sculptural gold hoop earrings", "👜 Smooth minimalist crossbody bag",
        "✨ Delicate gold chain wristwatch", "👜 Small curved baguette shoulder bag", "🖤 Black leather statement belt",
        "👜 Woven raffia market tote", "✨ Minimal layered gold necklaces", "👜 Structured evening clutch"
    ],
    tips: [
        "Keep accessories minimal and let the clean silhouette do the heavy lifting.",
        "Slightly tuck the front of your top to instantly define your waistline.",
        "Stick to a cohesive neutral or monochromatic color palette for an expensive look.",
        "Anchor the outfit with one standout piece while keeping everything else understated.",
        "Balance proportions effortlessly by pairing structured tailoring with relaxed silhouettes.",
        "Roll up your sleeves and add sleek hardware to elevate basic separates instantly.",
        "Let your footwear dictate the mood—dress it up with heels or ground it with loafers."
    ]
};

function getRandomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function generateLook() {
    if (!selectedState.occasion || !selectedState.vibe || !selectedState.weather) return;

    // Pick unique items from the pools to ensure massive variation
    const top = getRandomItem(pool.tops);
    const bottom = getRandomItem(pool.bottoms);
    const layer = getRandomItem(pool.layers);
    const footwear = getRandomItem(pool.footwear);
    const accessory = getRandomItem(pool.accessories);
    const tip = getRandomItem(pool.tips);

    recipeTags.textContent = `${selectedState.occasion} • ${selectedState.vibe} • ${selectedState.weather}`;
    
    outfitList.innerHTML = '';
    [top, bottom, layer, footwear, accessory].forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        outfitList.appendChild(li);
    });

    styleTipText.textContent = tip;

    defaultState.classList.add('hidden');
    resultState.classList.remove('hidden');
}

generateBtn.addEventListener('click', generateLook);
regenerateBtn.addEventListener('click', generateLook);
