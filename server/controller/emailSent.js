const nodemailer = require('nodemailer');

const emailSent = async (usermail,data) => {
    try{
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: process.env.MAIL_USER,
              pass: process.env.MAIL_PASS,
            },
          });
          const mailOptions = {
            from: 'প্রথমসংবাদ',
            to: usermail,
            subject: "Registration successfull",
            html:  `<h1> ${data} </h1>`,
          };
        await transporter.sendMail(mailOptions)
        console.log("email sent");
    }catch(err){
        console.log(err);
    }
}

module.exports = emailSent;
