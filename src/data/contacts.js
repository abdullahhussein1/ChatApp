export const contacts = [
  {
    id: 1,
    username: "Abdullah Hussein",
    email: "aduli.maestro11@gmail.com",
    status: "online",
    contactsId: [2, 3, 4],
  },
  {
    id: 2,
    username: "Ali Umed",
    email: "ali@gmail.com",
    status: "offline",
    contacts: [],
  },
  {
    id: 3,
    username: "Muhammed Yasin",
    email: "muhammed@gmail.com",
    status: "online",
    contacts: [],
  },
  {
    id: 4,
    username: "Omer Rzgar",
    email: "omer@gmail.com",
    status: "online",
    contacts: [],
  },
];

export function getContactById(id) {
  return contacts.find((contact) => contact.id === id);
}
