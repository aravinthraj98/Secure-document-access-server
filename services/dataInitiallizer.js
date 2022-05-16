const { generateKeyPairSync } = require('crypto');
const { API } = require('./Web3Initializer');
let processCount = 0;

let lastDate = new Date().getMilliseconds();
function getProcessId() {
  let date = new Date();
  let Id = 'p' + date.getDate() + (date.getMonth() + 1) + date.getFullYear();
  let milli = 24 * 60 * 60 * 1000;
  if (lastDate + milli <= new Date().getMilliseconds()) {
    processCount = 0;
    lastDate = new Date().getMilliseconds();
  } else {
    processCount++;
  }
  Id = Id + processCount;
  console.log({ Id });
  return Id;
}

async function addNewEmployee(id, deptName, password, isLead, fromAddress) {
  try {
    let gas = await API.methods
      .addNewEmployee(id, password, deptName, isLead)
      .estimateGas({
        from: fromAddress,
      });

    await API.methods
      .addNewEmployee(id, password, deptName, isLead)
      .send({ from: fromAddress, gas: gas });
  } catch (err) {
    return false;
  }

  return true;
}

async function setPriority(allDepartment) {
  let priority = [];
  for (let i in allDepartment) {
    if (allDepartment[i] == 'CMDA') {
      priority.push(2);
    } else {
      priority.push(1);
    }
  }
  await API.methods.setPriority(allDepartment, priority);
}

async function getVerifierLogin() {
  return { password: '2345', deptName: 'NHAI' };
}

module.exports = {
  addNewEmployee,
  setPriority,
  getProcessId,
};

// async function generateKeyForDept(departMents) {
//   let publicKeys = [];
//   let privateKeys = [];
//   const isKeyNeeded = await API.methods.isKeyNeeded().call();
//   if (!isKeyNeeded) {
//     console.log('key already present');
//     return { publicKeys, privateKeys };
//   }

//   for (let i in departMents) {
//     console.log('hereer');
//     const { publicKey, privateKey } = generateKeyPairSync('rsa', {
//       namedCurve: 'secp256k1', // Options
//       modulusLength: 4096,
//       publicKeyEncoding: {
//         type: 'spki',
//         format: 'pem',
//       },
//       privateKeyEncoding: {
//         type: 'pkcs8',
//         format: 'pem',
//       },
//     });
//     publicKeys.push(JSON.stringify(publicKey));
//     privateKeys.push(JSON.stringify(privateKey));
//   }
//   return { publicKeys, privateKeys };
// }

// async function saveDeptKeys(dept, publicKey, privateKey, fromAddress) {
//   console.log({ dept, privateKey, publicKey });
//   console.log({ fromAddress });
//   let gas = await API.methods
//     .updateDepartmentKeys(dept, publicKey, privateKey)
//     .estimateGas({
//       from: fromAddress,
//     });

//   await API.methods
//     .updateDepartmentKeys(dept, publicKey, privateKey)
//     .send({ from: fromAddress, gas: gas });
//   console.log('keys saved');
// }
