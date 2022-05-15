const { API } = require('./Web3Initializer');
let allDepartment = [];
let departmentPriority = {};
async function returnDepartment() {
  if (allDepartment.length == 0) await getAllDepartment();
  return allDepartment;
}
async function getAllDepartment() {
  let dept = await API.methods.showDepartments().call();
  allDepartment = [...dept];
  console.log({ dept });
  await getAllPriority(dept);
  return dept;
}
async function getAllPriority(dept) {
  let priority = await API.methods.getAllPriority().call();
  for (let i in dept) {
    departmentPriority[dept[i]] = priority[i];
  }
  console.log({ departmentPriority });
}

function getDeparmentPriority(dept) {
  return departmentPriority[dept];
}

async function getUserLogin(userId) {
  let data = await API.methods.getUserLoginDetails(userId).call();
  return data;
}

async function getVerifierLogin(userId) {
  let data = await API.methods.getVerfierLogin(userId).call();
  return data;
}



module.exports = {
  getAllDepartment,
  returnDepartment,
  getDeparmentPriority,
  getUserLogin,
  getVerifierLogin,
};
