const usernameData = [
    'piederecho',
    'aceventura',
    'ironmanfly',
    'scorpion',
    'turkeyhorn',
];

const emailData = [
    'blackberry@email.com',
    'grootsheep@email.com',
    'floranix@email.com',
    'astronout@email.com',
    'kyaniteegg@email.com',
];

const getUsername = (int) => usernameData[int];
const getEmail = (int) => emailData[int];

module.exports = { getUsername, getEmail};