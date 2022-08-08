const nodemailer = require("nodemailer");

const emailSent = async (usermail, data) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
    const mailOptions = {
      from: `'প্রথমসংবাদ' <${process.env.MAIL_USER}>`,
      to: usermail,
      subject: "verification code",
      html: data,
    };
    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = emailSent;
