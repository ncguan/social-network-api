const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getUsername, getEmail, getThought, getReactions } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');

    await User.deleteMany({});
    await Thought.deleteMany({});


    let thoughtsArr = [];
    for (let i = 0; i < 10; i++) {
        const reactions = getReactions(Math.floor(Math.random() * 10));
        const thoughtText = getThought(i);
        const username = getUsername(i);

        thoughtsArr.push({
            thoughtText,
            username,
            reactions
        });
    }

    const users = [];

    for (let i = 0; i < 10; i++) {
        const username = getUsername(i);
        const email = getEmail(i);
        const thoughts = thoughtsArr[i];

        users.push({
            username,
            email,
            thoughts
        });
    }


    await User.collection.insertMany(users);
    await Thought.collection.insertMany(thoughtsArr);

    console.info('Seeding complete');
    process.exit(0);
});
