const mongoose = require('mongoose');
const User = require('../models/User');
const Thought = require('../models/Thought');

mongoose.connect('mongodb://localhost:27017/socialNetworkDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const users = [
  {
    username: "alice",
    email: "alice@example.com"
  },
  {
    username: "bob",
    email: "bob@example.com"
  },
  {
    username: "charlie",
    email: "charlie@example.com"
  }
];

const thoughts = [
  {
    thoughtText: "Here's a cool thought...",
    username: "alice",  // Ensure usernames match the actual users
  },
  {
    thoughtText: "Bob thinking about something interesting...",
    username: "bob"
  },
  {
    thoughtText: "Charlie just had an idea...",
    username: "charlie"
  }
];

const seedDB = async () => {
  try {
    await User.deleteMany({});
    await Thought.deleteMany({});

    const createdUsers = await User.insertMany(users);
    const userMap = createdUsers.reduce((map, user) => {
      map[user.username] = user._id;
      return map;
    }, {});

    const thoughtsWithUserId = thoughts.map(thought => ({
      thoughtText: thought.thoughtText,
      username: thought.username,
      userId: userMap[thought.username]  // Map the username to the correct userId
    }));

    const createdThoughts = await Thought.insertMany(thoughtsWithUserId);

    // Optionally link thoughts back to users
    for (let i = 0; i < createdUsers.length; i++) {
      createdUsers[i].thoughts.push(createdThoughts[i]._id);
      await createdUsers[i].save();
    }

    console.log('Database seeded!');
  } catch (error) {
    console.error('Failed to seed database:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedDB();
