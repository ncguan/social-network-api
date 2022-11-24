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
];

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
];

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
];

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
];

const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const getUsername = (int) => usernameData[int];
const getEmail = (int) => emailData[int];

const getThought = (int) => thoughtData[int];

const getReactions = (int) => {
    let reactions = [];
    if (int === 0) {
        return reactions;
    }
    for (let i = 0; i < int; i++) {
        reactions.push({
            reactionBody: getRandomArrItem(reactionData),
            username: getRandomArrItem(usernameData)
        });
    }
    return reactions;
};

module.exports = { getUsername, getEmail, getThought, getReactions };