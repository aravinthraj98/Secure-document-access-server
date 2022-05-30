const express = require('express');
const { addNewEmployee } = require('../services/dataInitiallizer');
const {
  getVerifierLogin,
  getDeparmentPriority,
  getAllDepartment,
  returnPriority,
  returnDepartment,
  getAllPriority,
} = require('../services/getData');
const { generateToken, verifyToken } = require('../services/jwtServices');
const { sendMail } = require('../services/MailService');
const {
  API,
  returnAllAccounts,
  getAllAccounts,
} = require('../services/Web3Initializer');
const router = express.Router();
router.get('/getDepartmentDetails', async (req, res) => {
  let dept = await getAllDepartment();
  let priority = returnPriority();
  res.send({ dept, priority });
});
router.post('/addEmployee', async (req, res) => {
  let data = req.body;
  console.log({ data });

  let account = await returnAllAccounts();
  try {
    let accountCount = await API.methods.getEmployerCount().call();
    console.log({ account });
    let Id = 'VA';
    Id = Id + (1000 + Number(accountCount));
    let status = await addNewEmployee(
      Id,
      data.deptName,
      data.password,
      data.isLead,
      account[accountCount]
    );
    await sendMail(
      data.email,
      'account creation',
      `Account creation at ${data.deptName} and ${'id is s ' + Id}\n password:${
        data.password
      } please change the password..`
    );
    if (status == false) {
      throw new Error('Internal server error');
    }
    let newData = {
      address: account[accountCount],
      userId: Id,
      deptName: data.deptName,
    };

    return res.send({
      isValid: true,
      token: generateToken(newData),
      userId: Id,
    });
  } catch (err) {
    console.log(err);
    return res.send({ isValid: false, msg: 'Internal server error' });
  }
});

router.get('/myProcess', async (req, res) => {
  let header = req.headers.authorization;
  console.log({ header });
  let verify = verifyToken(header);
  console.log({ verify });
  try {
    let method = await API.methods.fetchMyProcess(verify.deptName).call();
    let myPriority = await getDeparmentPriority(verify.deptName);

    console.log({ method, myPriority });
    res.send({ method, myPriority });
  } catch (err) {
    console.log(err);
    res.send(null);
  }
});
router.post('/login', async (req, res) => {
  let temp = req.body;
  console.log({ temp });
  let data = await getVerifierLogin(temp.userId);

  let account = await returnAllAccounts();
  console.log({ admin: data });
  if (data) {
    if (data.password == temp.password) {
      let address = temp.userId.split('A')[1];
      address = Number(address) - 1000;
      address = account[address];
      console.log('new address Verifer', address);
      let tempData = {
        userId: temp.userId,
        deptName: data.deptName,
        isLead: data.isLead,
        address,
      };
      console.log({ tempData });
      return res.send({
        isValid: true,
        token: generateToken(tempData),
        userId: temp.userId,
        isAdmin: true,
        isLead: data.isLead,
        role: data.deptName,
      });
    } else {
      return res.send({ isValid: false, msg: 'password mismatch' });
    }
  }
  return res.send({ isValid: false, msg: 'Internal server error' });
});

router.get('/verifyProcess', async (req, res) => {
  let header = req.headers.authorization;

  let verify = verifyToken(header);
  let Id = req.query.id;

  let data = {};
  console.log({ verify });
  let accessData = await API.methods.fetchAccess(Id, verify.deptName).call();
  let fetchData = await API.methods.fetchDocument(Id).call();
  let isAccess = false;
  console.log({ accessData: accessData });
  for (let i in accessData.approvalDept) {
    if (accessData.approvalDept[i][0] == verify.deptName) {
      console.log(verify.deptName);

      if (
        Number(accessData.currentPriority) <
        getDeparmentPriority(verify.deptName)
      ) {
        console.log(accessData.approvalDept[i]);
        isAccess = false;
      } else {
        isAccess = true;
      }
    }
  }

  data = {
    ...accessData,
    ...fetchData,
  };
  if (isAccess == false) {
    return res.send('No access');
  }
  res.send(data);
});

router.post('/updateProcess', async (req, res) => {
  let data = req.body;
  let header = req.headers.authorization;

  let verify = verifyToken(header);
  console.log({ verify });
  data.status.transactedPerson = verify.address;
  data.status.verifierId = verify.userId;
  let accessData = await API.methods
    .fetchAccess(data.processId, verify.deptName)
    .call();
  let minimumPriority = 99;

  if (data.status.approvedStatus == 'true') {
    console.log('approved status true');
    for (let i in accessData.approvalDept) {
      if (
        accessData.approvalDept[i][0] !== verify.deptName &&
        (accessData.approvalDept[i][0] != '' ||
          accessData.approvalDept[i][1] > 0)
      ) {
        console.log(
          accessData.approvalDept[i][0] + '  ' + accessData.approvalDept[i][1]
        );
        minimumPriority =
          minimumPriority > accessData.approvalDept[i][1]
            ? accessData.approvalDept[i][1]
            : minimumPriority;
      }
    }
  } else {
    minimumPriority = data.currentPriority;
  }
  console.log({ minimumPriority });
  data.status.approvalDept = verify.deptName;

  console.log({ dept: data.status });
  let method = API.methods.updateProcessStatus(
    data.status,
    data.processId,
    minimumPriority
  );
  let gas = await method.estimateGas({ from: verify.address });
  console.log({ gas });
  await method.send({ from: verify.address, gas: gas });

  res.send('ss');
});
router.post('/modifyPriority', async (req, res) => {
  let data = req.body;
  let header = req.headers.authorization;
  let verify = verifyToken(header);
  let dept = data.dept;
  let priority = [];
  priority = await API.methods.getAllPriority().call();
  let allDepartment = await returnDepartment();
  let index = allDepartment.indexOf(dept);
  if (index != -1) {
    let tempdata = [];
    for (let i in priority) {
      if (i == index) {
        tempdata[i] = data.priority;
      } else {
        tempdata[i] = priority[i];
      }
    }
    console.log(index + ' ' + data.priority);
    console.log({ priority });
    let method = API.methods.updatePriority(tempdata);
    let gas = await method.estimateGas({ from: verify.address });
    await method.send({ from: verify.address, gas: gas });

    await getAllPriority(allDepartment);
    res.send(true);
  } else {
    res.send(false);
  }
});

router.post('/changePassword', async (req, res) => {
  let data = req.body;
  let header = req.headers.authorization;
  let verify = verifyToken(header);
  let method = API.methods.changePassword(
    verify.userId,
    data.password,
    data.newPassword
  );
  console.log(verify.userId);
  let gas = await method.estimateGas({ from: verify.address });
  await method.send({ from: verify.address, gas });
  let password = await getVerifierLogin(verify.userId);
  console.log({ password });
  let response = password.password == data.newPassword;
  console.log({ response });
  res.send(response);
});

router.get('/getProcessed', async (req, res) => {
  let header = req.headers.authorization;
  let verify = verifyToken(header);

  console.log({ verify });
  let body = await API.methods.getFinishedProcess(verify.deptName).call();
  console.log({ body });
  res.send(body);
});

router.post('/addDepartment', async (req, res) => {
  let header = req.headers.authorization;
  let data = req.body;
  let verify = verifyToken(header);
  let method = API.methods.addNewDept(data.priority, data.deptName);
  let gas = await method.estimateGas({ from: verify.address });
  await method.send({ from: verify.address, gas });
  res.send(true);
});
module.exports = router;
