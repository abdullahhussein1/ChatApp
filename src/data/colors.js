const colors = [
  ["bg-rose-50", "text-rose-600"],
  ["bg-blue-50", "text-blue-600"],
  ["bg-green-50", "text-green-600"],
  ["bg-orange-50", "text-orange-600"],
  ["bg-red-50", "text-red-600"],
  ["bg-yellow-50", "text-yellow-600"],
  ["bg-amber-50", "text-amber-600"],
  ["bg-pink-50", "text-pink-600"],
  ["bg-teal-50", "text-teal-600"],
  ["bg-indigo-50", "text-indigo-600"],
  ["bg-sky-50", "text-sky-600"],
  ["bg-violet-50", "text-violet-600"],
  ["bg-emerald-50", "text-emerald-600"],
  ["bg-purple-50", "text-purple-600"],
];

export function getColorById(contactId) {
  const color = colors[contactId - (1 % colors.length)];

  return color;
}

console.log(getColorById(1));
