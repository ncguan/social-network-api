const connection = require('../config/connection');
const { User, Thought } = require('../models');

connection.on('error', (err) => err);

const usernameData = [
    'piederecho',
    'aceventura',
    'ironmanfly',
    'scorpion',
    'turkeyhorn',
    'seamircorn',
    'droughtcow',
    'pioneer10',
    'blazarfly',
    'cityofgod'
]

const emailData = [
    'blackberry@email.com',
    'grootsheep@email.com',
    'floranix@email.com',
    'astronout@email.com',
    'kyaniteegg@email.com',
    'pulsarham@email.com',
    'rainfall@email.com',
    'tempogenie@email.com',
    'shrekpluto@email.com',
    'oportunity@email.com'
]

const thoughtData = [
    'cool thought...',
    'thinking...',
    'thoughtthought',
    'i think that',
    'Im thinking',
    'having a thought',
    'have a thought',
    'writing a thought',
    'just wrote a thought',
    'thinkthink'
]

const reactionData = [
    'cool reaction...',
    'reacting...',
    'reactreact',
    'i am reacting',
    'Im reacting',
    'having a reaction',
    'have a reaction',
    'writing a reaction',
    'just wrote a reaction',
    'reactionreaction'
]

connection.once('open', async () => {
    console.log('connected');

    await User.deleteMany({});

    await Thought.deleteMany({});

    const users = [];

    for (let i = 0; i < usernameData.length; i++) {
        const username = usernameData[i];
        const email = emailData[i];
        const thoughts = thoughtData[i];

        const friends = [];
        const randNumFriends = Math.floor(Math.random() * usernameData.length);
        for (let i = 0; i < randNumFriends; i++) {
            friends.push(usernameData[Math.floor(Math.random() * usernameData.length)])
        };

        users.push({
            username,
            email,
            thoughts,
            friends,
        });
    };

    await User.collection.insertMany(users);

    const thoughts = [];

    for (let i = 0; i < thoughtData.length; i++) {
        const thoughtText = thoughtData[i];
        const username = usernameData[i];

        const reactions = [];
        const randNumReactions = Math.floor(Math.random() * reactionData.length);
        for (let i = 0; i < randNumReactions; i++) {
            reactions.push(reactionData[Math.floor(Math.random() * reactionData.length)])
        };

        thoughts.push({
            thoughtText,
            username,
            reactions,
        });
    };

    await Thought.collection.insertMany(thoughts);

    console.table(users);
    console.table(thoughts);
    console.info('Seeding complete');
    process.exit(0);
});
