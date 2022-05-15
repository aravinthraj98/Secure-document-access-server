const express = require('express');
const {
  generateKeyPair,
  publicEncrypt,
  privateDecrypt,
  generateKeyPairSync,
} = require('crypto');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoute = require('./routing/userRoute');
const adminRoute = require('./routing/adminRoute');
const { getAllAccounts, API } = require('./services/Web3Initializer');
const { addNewEmployee, setPriority } = require('./services/dataInitiallizer');
const { getAllDepartment } = require('./services/getData');
const owner = '0x45034bc348ea4963d68101dd0925e110b7f115d6';
let allDepartment = [];
let deptPriority;
let sampleData = {
  src: [
    'askkksdksdksdksdksdksdksdkkk',
    'askkksdksdksdksdksdksdksdkkk',
    'askkksdksdksdksdksdksdksdkkk',
    'askkksdksdksdksdksdksdksdkkk',
    'askkksdksdksdksdksdksdksdkkk',
    'askkksdksdksdksdksdksdksdkkk',
    'askkksdksdksdksdksdksdksdkkk',
    'askkksdksdksdksdksdksdksdkkk',
    'askkksdksdksdksdksdksdksdkkk',
  ],
  fullAddress:
    'fjsdkhfbhsbfhsb donvosnvfnva ojnvasojnvojsan owjnfjdsnva nonvkjnvjas jwfendsakjnvkjas wnadndvkjcnaksnc jwnvkjsakvjsadjc wnjkadsvkjs dwvsanvkjsvaswv akjw wefnnkawjn jkaw ',
  description: 'dsacaccsc',
  departMentNeeded: 'sxxxxxxzdsssssssssssssssss',
};

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
// app.post('/register', async (req, res) => {
//   let data = req.body;

//   let id = '101';
//   console.log({ data });
//   let gas = await API.methods
//     .saveLogin(id, { email: data.email, password: data.password })
//     .estimateGas({ from: owner });
//   await API.methods
//     .saveLogin(id, { email: data.email, password: data.password })
//     .send({ from: owner, gas: gas });
//   res.send('success');
// });
app.get('/getKey', (req, res) => {
  // let privateKey = '';
  // let publicKey = '';
  console.log('Hello');
  const { publicKey, privateKey } = generateKeyPairSync('rsa', {
    namedCurve: 'secp256k1', // Options
    modulusLength: 4096,
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem',
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem',
    },
  });

  let decrypt = publicEncrypt(publicKey, Buffer.from('hello encryp'));
  console.log(
    privateDecrypt(
      privateKey,
      Buffer.from(decrypt.toString('base64'), 'base64')
    ).toString()
  );
  res.send('hello');
  // generateKeyPairSync(
  //   'rsa',
  //   {
  //     modulusLength: 4096,
  //     publicKeyEncoding: {
  //       type: 'spki',
  //       format: 'pem',
  //     },
  //     privateKeyEncoding: {
  //       type: 'pkcs8',
  //       format: 'pem',
  //     },
  //   },
  //   (err, publicKey, privateKey) => {
  //     console.log({ privateKey, publicKey });
  //     privateKey = privateKey;
  //     publicKey = publicKey;

  //     res.send({ publicKey, privateKey });
  //   }
  // );
});

app.use('/user', userRoute);
app.use('/admin', adminRoute);

app.listen(4000, () => {
  getAllAccounts().then(async () => {
    const status = await addNewEmployee('OA1000', 'owner', 'aravinth', owner);
    allDepartment = await getAllDepartment();
  });

  console.log('http://localhost:4000');
});
