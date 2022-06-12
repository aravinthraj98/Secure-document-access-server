// const nodemailer = require('nodemailer');

// let transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'tempemail2905@gmail.com',
//     pass: '@Tempemail1',
//   },
// });

// let mailOptions = {
//   from: 'tempemail2905@gmail.com',
//   to: '',
//   subject: '',
//   text: '',
// };

// const smtp = require('emailjs');

// const client = new SMTPClient({
//   user: 'tempemail2905@gmail.com',
//   password: '@Tempemail1',
//   host: 'tempemail2905@gmail.com',
//   ssl: true,
// });

// send the message and get a callback with an error or details of the message that was sent

async function sendMail(receiver, subject, text) {
  // client.send(
  //   {
  //     text: text,
  //     from: 'you <username@your-email.com>',
  //     to: 'aravinthraj1972@gmail.com',
  //     cc: 'else <else@your-email.com>',
  //     subject: 'testing emailjs',
  //   },
  //   (err, message) => {
  //     console.log(err || message);
  //   }
  // );
}

module.exports = { sendMail };
