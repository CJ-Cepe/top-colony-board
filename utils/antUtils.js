const roles = {
  common: ["worker", "scout", "soldier", "cleaner"],
  uncommon: ["lazy-ant", "nurse", "drone"],
  unusual: [
    "impostor-termite",
    "queen-lover",
    "philosopher-ant",
    "gossiping-ant",
    "antfluencer",
  ],
};

const description = {
  worker:
    "A hardworking ant focused on building, repairing, and transporting resources.",
  scout: "An adventurous ant always looking for new food sources and paths.",
  soldier: "A strong defender of the colony, always on guard against threats.",
  cleaner:
    "Maintains colony hygiene by removing waste and keeping tunnels tidy.",

  "lazy-ant":
    "Frequently seen napping. Occasionally thinks about helping... later.",
  nurse:
    "A nurturing ant responsible for tending to eggs, larvae, and unwell ants.",
  drone:
    "A winged ant with royal aspirations. Mostly daydreaming or waiting for the queen.",

  "impostor-termite":
    "Totally not a termite. Please ignore the suspicious behavior.",
  "queen-lover":
    "Deeply devoted to the queen. Maybe too devoted. Possibly writing poetry.",
  "philosopher-ant":
    "Always questioning the colony’s purpose. Existentialism in the tunnels.",
  "gossiping-ant":
    "Knows everything about everyone and can’t wait to share it.",
  antfluencer:
    "Buzzing with style and updates. Lives for aesthetics and attention.",
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
  nurse: [
    "Egg cluster status",
    "Larva growth log",
    "Brood chamber too cold",
    "Feeding schedule update",
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
  antfluencer: [
    "Aesthetic tunnel pics",
    "AntFit tips",
    "Collab with beetle?",
    "Queen shoutouts",
  ],
};

function getRandomRole() {
  const roll = Math.random();
  if (roll < 0.8) return pickRandom(roles.common);
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

function getDescription(role) {
  return description[role] || "";
}

function assignNewAntIdentityToSession(session) {
  const role = getRandomRole();
  const name = generateAntName(role);
  const description = getDescription(role);
  const topics = getTopics(role);

  session.role = role;
  session.name = name;
  session.description = description;
  session.topics = topics;

  return { role, name, description, topics };
}

export { assignNewAntIdentityToSession };
