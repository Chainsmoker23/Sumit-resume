// script.js
// script.js

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contact-form');

  form.addEventListener('submit', function(event) {
    event.preventDefault();  // prevent default form submission

    // Retrieve and trim form values
    const name    = document.getElementById('name').value.trim();
    const email   = document.getElementById('email').value.trim();
    const message = document.getElementById('Message').value.trim();

    if (!name || !email || !message) {
      return alert('Please complete all fields before sending.');
    }

    // SMTP.js configuration
    const smtpConfig = {
      SecureToken : 'Chainsmoker23',                // ← generate at smtpjs.com
      Host        : 'smtp.your-email-provider.com',     // ← e.g. smtp.gmail.com
      From        : 'no-reply@yourdomain.com',          // ← your verified sender
    };

    // Build the email payload
    const mailOptions = Object.assign({}, smtpConfig, {
      To      : 'sumitbhowmick903@gmail.com',
      Subject : `Contact form submission from ${name}`,
      Body    : `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br>${message.replace(/\n/g,'<br>')}</p>
      `
    });

    // Send the email
    Email.send(mailOptions)
      .then(response => {
        console.log('Message delivered:', response);
        alert('Thank you! Your message has been sent.');
        form.reset();
      })
      .catch(error => {
        console.error('Send failed:', error);
        alert('Oops—there was an error sending your message. Please try again later.');
      });
  });
});
