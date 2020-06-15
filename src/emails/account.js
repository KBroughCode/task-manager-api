const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "krisbroughmusic@hotmail.co.uk",
    subject: "Thanks for joining",
    text: `Welcome to the APP ${name}! Let me know how you find it`
  });
};

const sendCancellationEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "krisbroughmusic@hotmail.co.uk",
    subject: "Sorry to see you go!",
    text: ` Hi ${name} we're sorry to see you leave us. Please let us know what we can do better`
  });
};

module.exports = { sendWelcomeEmail, sendCancellationEmail };
