const SENDER_NAMES = [
  "Haba A**** M****** S****",
  "Ahmed S**** E**** M*****",
  "Mona F**** A**** R*****",
  "Youssef K**** T**** N****",
  "Sara H**** B**** Z****",
  "Omar N**** W**** D*****",
  "Laila R**** Y**** G****",
  "Mostafa I**** Q**** F****",
];

const STORAGE_KEY = "confirm.lastSenderName";

export function getRandomSenderName(): string {
  let lastName: string | null = null;
  try {
    lastName = sessionStorage.getItem(STORAGE_KEY);
  } catch {
    lastName = null;
  }

  const pool = SENDER_NAMES.length > 1 ? SENDER_NAMES.filter((name) => name !== lastName) : SENDER_NAMES;
  const chosen: string = pool[Math.floor(Math.random() * pool.length)] ?? SENDER_NAMES[0] ?? "";

  try {
    sessionStorage.setItem(STORAGE_KEY, chosen);
  } catch {
    // ignore storage errors (e.g. private mode)
  }

  return chosen;
}
