const mongoose = require('mongoose');
const User = require('../models/User');
const Thought = require('../models/Thought');

mongoose.connect('mongodb://localhost:27017/socialNetworkDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const users = [
    { username: "alice", email: "alice@example.com" },
    { username: "bob", email: "bob@example.com" },
    { username: "charlie", email: "charlie@example.com" }
];

const thoughts = [
    { thoughtText: "Here's a cool thought...", username: "alice", reactions: [{ reactionBody: "Amazing!", username: "bob" }] },
    { thoughtText: "Bob thinking about something interesting...", username: "bob", reactions: [{ reactionBody: "That's intriguing!", username: "alice" }] },
    { thoughtText: "Charlie just had an idea...", username: "charlie", reactions: [{ reactionBody: "Great idea!", username: "alice" }] }
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
            userId: userMap[thought.username],
            reactions: thought.reactions.map(reaction => ({
                ...reaction,
                reactionId: new mongoose.Types.ObjectId(),
                createdAt: new Date()
            }))
        }));

        const createdThoughts = await Thought.insertMany(thoughtsWithUserId);

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
