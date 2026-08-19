// State management
const selectedState = {
    occasion: null,
    vibe: null,
    weather: null
};

// UI Elements
const generateBtn = document.getElementById('generateBtn');
const defaultState = document.getElementById('defaultState');
const resultState = document.getElementById('resultState');
const outfitList = document.getElementById('outfitList');
const recipeTags = document.getElementById('recipeTags');
const styleTipText = document.getElementById('styleTipText');
const regenerateBtn = document.getElementById('regenerateBtn');

// Handle Pill Selection Logic
document.querySelectorAll('.pill-container').forEach(container => {
    container.addEventListener('click', (e) => {
        const btn = e.target.closest('.pill-btn');
        if (!btn) return;

        const category = btn.dataset.category;
        const value = btn.dataset.value;

        // Toggle active status inside the same group
        container.querySelectorAll('.pill-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Update state
        selectedState[category] = value;

        // Check if all three selections are made to enable generate button
        if (selectedState.occasion && selectedState.vibe && selectedState.weather) {
            generateBtn.disabled = false;
        }
    });
});

// Outfit Database & Generator Logic
const outfitDatabase = {
    // Base foundational templates per Vibe & Occasion
    getBaseLook(occasion, vibe, weather) {
        let top = "🤍 White fitted tee";
        let bottom = "👖 Relaxed straight-leg jeans";
        let footwear = "👟 Clean leather sneakers";
        let layer = "🧥 Minimal trench coat";
        let accessory = "👜 Structured everyday tote";

        // Vibe Adjustments
        if (vibe === "Minimal") {
            top = "🤍 Crisp modal crewneck";
            bottom = "🖤 Tailored minimalist trousers";
            footwear = "👡 Sleek slide sandals";
            accessory = "👜 Smooth leather crossbody";
        } else if (vibe === "Classic") {
            top = "👔 Structured button-down shirt";
            bottom = "👖 Mid-rise pressed trousers";
            footwear = "👞 Classic loafers";
            accessory = "✨ Delicate gold wristwatch";
        } else if (vibe === "Feminine") {
            top = "🕊️ Silk draping blouse";
            bottom = "🩰 Flowing midi skirt";
            footwear = "🥿 Delicate strappy flats";
            accessory = "👜 Small curved shoulder bag";
        } else if (vibe === "Chic") {
            top = "🖤 Monochromatic knit top";
            bottom = "🖤 Wide-leg pleated trousers";
            footwear = "👢 Pointed-toe ankle boots";
            accessory = "✨ Sculptural gold earrings";
        } else if (vibe === "Edgy") {
            top = "⛓️ Asymmetrical dark top";
            bottom = "👖 Washed vintage denim";
            footwear = "🥾 Chunky minimal boots";
            accessory = "🖤 Black leather belt";
        } else if (vibe === "Relaxed") {
            top = "☁️ Oversized cotton knit";
            bottom = "👖 Easy wide-leg trousers";
            footwear = "👟 Retro runner sneakers";
            accessory = "👜 Canvas utility tote";
        }

        // Occasion Tweaks
        if (occasion === "Work") {
            top = "👔 Tailored poplin shirt";
            bottom = "👖 Pleated crepe trousers";
            footwear = "👞 Structured loafers";
        } else if (occasion === "Date Night" || occasion === "Dinner") {
            top = "🖤 Silk camisole or fine knit";
            bottom = "🖤 Sleek midi skirt or trousers";
            footwear = "👠 Minimal heeled sandals";
            accessory = "✨ Statement gold hoops";
        } else if (occasion === "Wedding") {
            top = "🕊️ Elegant slip dress or silk set";
            bottom = "✨ Matching fluid overlay";
            footwear = "👡 Strappy evening heels";
            accessory = "👜 Structured evening clutch";
        } else if (occasion === "Travel") {
            top = "☁️ Premium cotton layering tee";
            bottom = "👖 Stretch ribbed knit trousers";
            footwear = "👟 Slip-on comfort sneakers";
            accessory = "👜 Oversized carry-on tote";
        } else if (occasion === "Brunch") {
            top = "🤍 Linen button-down shirt";
            bottom = "👖 Tailored shorts or light denim";
            footwear = "👡 Minimal flat slides";
            accessory = "👜 Raffia weave basket bag";
        }

        // Weather Adjustments (Outerwear & Layering overrides)
        if (weather === "Hot") {
            layer = "☀️ Lightweight linen overshirt";
        } else if (weather === "Cold") {
            layer = "🧥 Heavy wool structured coat";
            top = "🧣 Cashmere turtleneck knit";
        } else if (weather === "Rainy") {
            layer = "🧥 Weatherproof trench or shell";
            footwear = "🥾 Polished waterproof boots";
        }

        return [top, bottom, layer, footwear, accessory];
    },

    getStyleTip(vibe, occasion) {
        const tips = [
            "Keep the accessories minimal and let the clean silhouette do the work.",
            "Tuck in the front slightly to instantly define your waistline.",
            "Stick to a cohesive neutral color palette for an expensive, effortless look.",
            "Let one piece anchor the outfit while keeping everything else understated.",
            "Balance proportions by pairing a structured top with relaxed bottoms."
        ];
        return tips[Math.floor(Math.random() * tips.length)];
    }
};

// Generate Look Event
function handleGenerate() {
    if (!selectedState.occasion || !selectedState.vibe || !selectedState.weather) return;

    // Fetch items based on selection
    const items = outfitDatabase.getBaseLook(selectedState.occasion, selectedState.vibe, selectedState.weather);
    const tip = outfitDatabase.getStyleTip(selectedState.vibe, selectedState.occasion);

    // Populate UI
    recipeTags.textContent = `${selectedState.occasion} • ${selectedState.vibe} • ${selectedState.weather}`;
    
    outfitList.innerHTML = '';
    items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        outfitList.appendChild(li);
    });

    styleTipText.textContent = tip;

    // Switch view states
    defaultState.classList.add('hidden');
    resultState.classList.remove('hidden');
}

generateBtn.addEventListener('click', handleGenerate);
regenerateBtn.addEventListener('click', handleGenerate);
