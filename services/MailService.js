const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'tempemail2905@gmail.com',
    pass: '@Tempemail1',
  },
});

let mailOptions = {
  from: 'tempemail2905@gmail.com',
  to: '',
  subject: '',
  text: '',
};

async function sendMail(receiver, subject, text) {
  //   mailOptions.to = receiver;
  //   mailOptions.subject = subject;
  //   mailOptions.text = text;
  //   await new Promise((resolve, reject) => {
  //     transporter.sendMail(mailOptions, (error, info) => {
  //       if (error) {
  //         reject();
  //         console.log(error);
  //       } else {
  //         resolve();
  //         console.log('success');
  //       }
  //     });
  //   });
}

module.exports = { sendMail };
