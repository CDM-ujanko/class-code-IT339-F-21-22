db = db.getSiblingDB('it339-notes');
db.createCollection('notes');
db.notes.insertMany([
  {
    key: '1',
    title: 'My First Note',
    body: 'hello!'
  }
]);

db = db.getSiblingDB('it339-users');
db.createCollection('users');
db.users.insertMany([
  {
    username: 'ujankovic',
    password: '$2b$10$CA2XdWfqzt9WFcVuXUzk9.7sWrSRj4WyL.OW.XBCxv48EyWSWlFQe',
    firstName: 'Uros',
    lastName: 'Jankovic',
  }
]);
