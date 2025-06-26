const roles = {
  common: ["worker", "scout", "soldier", "cleaner"],
  uncommon: ["lazy-ant", "antfluencer", "drone"],
  unusual: [
    "impostor-termite",
    "queen-lover",
    "philosopher-ant",
    "gossiping-ant",
  ],
};

function getRandomRole() {
  const roll = Math.random();
  if (roll < 0.7) return pickRandom(roles.common);
  if (roll < 0.9) return pickRandom(roles.uncommon);
  return pickRandom(roles.unusual);
}

function generateAntName(role) {
  const number = Math.floor(Math.random() * 900 + 100); // 100–999
  return `${role}-${number}`;
}

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export { generateAntName, getRandomRole };
