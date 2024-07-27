const colors = [
  "yellow",
  "blue",
  "green",
  "red",
  "orange",
  "amber",
  "teal",
  "indigo",
  "sky",
  "emerald",
  "pink",
  "rose",
  "violet",
  "purple",
];

export function getColorById(contactId) {
  const color = colors[(contactId - 1) % colors.length];

  return [`bg-${color}-50`, `text-${color}-600`];
}
