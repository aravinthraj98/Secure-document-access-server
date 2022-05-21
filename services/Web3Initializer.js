const web3 = require('web3');
const ABI = require('./ABI');

const Web3 = new web3('http://localhost:7545');
const contractAddress = '0x118a411FcCFE906b4061B9d191457d7aE06DD1f5';
const API = new Web3.eth.Contract(ABI, contractAddress);
let allAccounts = [];
async function getAllAccounts() {
  let accounts = await Web3.eth.getAccounts();
  allAccounts = [...accounts];
}

async function returnAllAccounts() {
  if (allAccounts.length == 0) await getAllAccounts();
  return allAccounts;
}

module.exports = { API, getAllAccounts, returnAllAccounts };
