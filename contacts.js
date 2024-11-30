const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath, "utf8");
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const numericId = Number(contactId);
  if (isNaN(numericId) || numericId < 1 || numericId > contacts.length) {
    return `Contact cu ID-ul ${contactId} nu există.`;
  }
  return contacts[numericId - 1];
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const numericId = Number(contactId);
  if (isNaN(numericId) || numericId < 1 || numericId > contacts.length) {
    return `Contact cu ID-ul ${contactId} nu există.`;
  }
  const updatedContacts = contacts.filter((_, index) => index !== numericId - 1);
  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
  return updatedContacts;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = {
    id: `id_${contacts.length + 1}`,
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};