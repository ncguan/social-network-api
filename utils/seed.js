const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getUsername, getEmail} = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');

    await User.deleteMany({});
    await Thought.deleteMany({});

    const users = [];

    for (let i = 0; i < 5; i++) {
        const username = getUsername(i);
        const email = getEmail(i);

        users.push({
            username,
            email,
        });
    }

    await User.collection.insertMany(users);

    console.info('Seeding complete');
    process.exit(0);
});
