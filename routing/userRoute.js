const express = require('express');
const ABI = require('../services/ABI');
const { getProcessId } = require('../services/dataInitiallizer');

const {
  returnDepartment,
  getDeparmentPriority,
  getUserLogin,
} = require('../services/getData');
const { returnAllAccounts, API } = require('../services/Web3Initializer');
const { generateToken, verifyToken } = require('../services/jwtServices');
const router = express.Router();

router.post('/register', async (req, res) => {
  let account = await returnAllAccounts();
  let data = req.body;
  try {
    let accountCount = await API.methods.getEmployerCount().call();
    console.log({ account });
    let Id = 'UA';
    Id = Id + (Number(accountCount) + 1000);
    let method = API.methods.saveLogin(Id, {
      email: data.email,
      password: data.password,
    });

    console.log(account[accountCount]);
    let gas = await method.estimateGas({ from: account[accountCount] });
    await method.send({ from: account[accountCount], gas: gas });
    let newData = { address: account[accountCount], userId: Id };

    return res.send({
      isValid: true,
      token: generateToken(newData),
      userId: Id,
    });
  } catch (err) {
    console.log(err);
    return res.send({ isValid: false });
  }
});

router.get('mydocuments', (req, res) => {
  res.send('fetching document');
});
router.post('/addDocuments', async (req, res) => {
  let processId = getProcessId();

  let header = req.headers.authorization;
  console.log({ header });
  let verify = verifyToken(header);
  console.log({ verify });
  if (!verify.userId) return res.send(false);

  let data = req.body;
  if (data.isUpdate) {
    processId = data.processId;
    console.log({ processId });
  }
  console.log({ data });
  try {
    console.log('coming here 0');

    console.log('coming here');

    let deptKeyDetails = [];
    let minimumPriority = 99;
    for (let i in data.deptList) {
      let newData = {
        deptName: data.deptList[i],
        priority: getDeparmentPriority(data.deptList[i]),
      };
      minimumPriority =
        minimumPriority > newData.priority ? newData.priority : minimumPriority;
      deptKeyDetails.push(newData);
    }
    console.log({ deptKeyDetails });
    let methods = API.methods.addNewProcess(
      processId,
      data.fullAddress,
      data.description,
      data.docSrc,
      verify.userId,
      minimumPriority
    );
    let methods1 = API.methods.addAccessDetails(
      processId,
      deptKeyDetails,
      minimumPriority,
      verify.userId,
      data.description
    );
    let gas1 = await methods1.estimateGas({ from: verify.address });

    let gas = await methods.estimateGas({ from: verify.address });
    console.log({ gas });
    await methods.send({ from: verify.address, gas: gas });
    await methods1.send({ from: verify.address, gas: gas1 });
    console.log('success');
  } catch (err) {
    console.log({ err });
    return res.send(false);
  }
  res.send(true);
});
router.get('addDocument', (req, res) => {
  res.send('getting document');
});
router.get('/getAllDepartment', async (req, res) => {
  let getAllDepartment = await returnDepartment();
  res.send(getAllDepartment);
});

router.post('/login', async (req, res) => {
  let temp = req.body;
  let data = await getUserLogin(temp.userId);
  let account = await returnAllAccounts();
  console.log({ data });

  if (data) {
    if (data.password == temp.password) {
      let address = temp.userId.split('A')[1];
      address = Number(address) - 1000;
      address = account[address];
      console.log('new address', address);
      let tempData = {
        userId: temp.userId,
        email: temp.email,
        address,
        isAdmin: false,
        role: 'user',
      };
      return res.send({
        isValid: true,
        token: generateToken(tempData),
        userId: temp.userId,
        isAdmin: false,
      });
    } else {
      return res.send({ isValid: false, msg: 'password mismatch' });
    }
  }
  return res.send({ isValid: false, msg: 'Internal server error' });
});
router.get('/myProcess', async (req, res) => {
  let header = req.headers.authorization;
  console.log({ header });
  let verify = verifyToken(header);
  console.log({ verify });
  try {
    let method = await API.methods.fetchUserProcess(verify.userId).call();

    console.log({ method });
    res.send(method);
  } catch (err) {
    console.log(err);
    res.send(null);
  }
});

router.get('/viewProcessStatus', async (req, res) => {
  let header = req.headers.authorization;

  let verify = verifyToken(header);
  let Id = req.query.id;
  let method = await API.methods.fetchUserProcess(verify.userId).call();
  console.log(method);
  if (method[0][2] != verify.userId) {
    return res.send(null);
  }

  let data = {};
  console.log({ verify });

  let accessData = await API.methods.fetchAccess(Id, 'docOwner').call();
  let fetchData = await API.methods.fetchDocument(Id).call();
  data = {
    ...accessData,
    ...fetchData,
  };

  res.send(data);
});
module.exports = router;
