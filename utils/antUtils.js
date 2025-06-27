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

const topics = {
  worker: [
    "Maintenance report",
    "Tunnel blockage",
    "Need more mud",
    "Food transport log",
  ],
  scout: ["Food found", "Danger spotted", "New paths", "Obstacles ahead"],
  soldier: [
    "Invader alert",
    "Defense drills",
    "Guard duty logs",
    "Strange scent",
  ],
  cleaner: ["Trash locations", "Rot reports", "Nest hygiene", "Dead ant alert"],
  "lazy-ant": [
    "Nap thoughts",
    "Procrastination logs",
    "Work is hard",
    "Should we unionize?",
  ],
  antfluencer: [
    "Aesthetic tunnel pics",
    "AntFit tips",
    "Collab with beetle?",
    "Queen shoutouts",
  ],
  drone: ["Mating flight notes", "Wings status", "Daydreams", "Queen thoughts"],
  "impostor-termite": [
    "Pretend reports",
    "Blame others",
    "Sabotage ideas",
    "Fake tunnel plans",
  ],
  "queen-lover": [
    "Love poems",
    "Queen sightings",
    "Royal dreams",
    "Romantic delusions",
  ],
  "philosopher-ant": [
    "What is a colony?",
    "Is the queen real?",
    "Ant consciousness",
    "Thoughts on crumbs",
  ],
  "gossiping-ant": [
    "Did you hear?",
    "Drama report",
    "Ant vs ant",
    "Tunnel rumors",
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

function getTopics(role) {
  return topics[role] || [];
}

export { generateAntName, getRandomRole, getTopics };
