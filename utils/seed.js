const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomUsername, getRandomEmail, getRandomThoughts, getRandomReaction } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
  if (userCheck.length) {
    await connection.dropCollection('users');
  }

  let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
  if (thoughtCheck.length) {
    await connection.dropCollection('thoughts');
  }

  const users = [];
  const numUsers = 20;

  // Generate random users
  for (let i = 0; i < numUsers; i++) {
    const username = getRandomUsername();
    const email = getRandomEmail();

    users.push({
      username,
      email
    });
  }

  // Insert random users into the database
  await User.insertMany(users);

  const thoughts = [];
  const numThoughts = 10;

  // Get all users from the database
  const allUsers = await User.find();

  for (let i = 0; i < numThoughts; i++) {
    const thoughtText = getRandomThoughts();
    const randomUserIndex = Math.floor(Math.random() * allUsers.length);
    const user = allUsers[randomUserIndex];

    const newThought = new Thought({
      thoughtText,
      username: user.username
    });

    user.thoughts.push(newThought);

    await user.save();

    thoughts.push(newThought);
  }

  await Thought.insertMany(thoughts);

  console.table(users);
  console.table(thoughts);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});