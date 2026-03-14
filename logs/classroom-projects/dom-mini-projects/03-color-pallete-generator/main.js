const formatSelect = document.getElementById("format");
const toneSelect = document.getElementById("tone");
const button = document.getElementById("generateBtn");

function randomRGB(tone) {
  let min = 0;
  let max = 255;

  if (tone === "light") {
    min = 150;
    max = 255;
  }

  if (tone === "dark") {
    min = 0;
    max = 125;
  }

  const r = Math.floor(Math.random() * (max - min) + min);
  const g = Math.floor(Math.random() * (max - min) + min);
  const b = Math.floor(Math.random() * (max - min) + min);

  return { r, g, b };
}

function rgbToHex(r, g, b) {
  // (0,0,0) - black
  // (255,0,0) - red
  // (0,255,0) - green
  // (0,0,255) - blue
  // (255,255,255) - white

  return "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");
}

function generatePalette() {
  palette.innerHTML = "";

  for (let i = 0; i < 5; i++) {
    const { r, g, b } = randomRGB(toneSelect.value);

    let color;

    if (formatSelect.value === "hex") {
      color = rgbToHex(r, g, b);
    } else {
      color = `rgb(${r}, ${g}, ${b})`;
    }

    const div = document.createElement("div");
    div.classList.add("color");

    div.style.background = `rgb(${r}, ${g}, ${b})`;
    div.textContent = color;

    palette.appendChild(div);
  }
}

button.addEventListener("click", generatePalette);

generatePalette();
