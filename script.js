// script.js

// Wait until the DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contact-form');

  form.addEventListener('submit', function(event) {
    event.preventDefault();  // prevent normal form submission

    // Collect form values
    const name    = document.getElementById('name').value.trim();
    const email   = document.getElementById('email').value.trim();
    const message = document.getElementById('Message').value.trim();

    if (!name || !email || !message) {
      alert('Please fill in all fields before sending.');
      return;
    }

    // Common payload options
    const smtpOptions = {
      SecureToken : 'YOUR_SECURE_TOKEN', 
      From        : 'no-reply@yourdomain.com',
      Host        : 'smtp.your-email-provider.com',
    };

    // 1. Send notification to site administrator
    Email.send(Object.assign({}, smtpOptions, {
      To      : 'admin@yourdomain.com',
      Subject : `New contact form submission from ${name}`,
      Body    : `
        <h3>New message received</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br>${message.replace(/\n/g,'<br>')}</p>
      `
    }))
    .then(function(response) {
      console.log('Admin notification sent:', response);
    })
    .catch(function(err) {
      console.error('Error sending admin notification:', err);
    });

    // 2. Send acknowledgement back to user
    Email.send(Object.assign({}, smtpOptions, {
      To      : email,
      Subject : 'Thank you for contacting us',
      Body    : `
        <p>Dear ${name},</p>
        <p>Thank you for your message. We have received your inquiry and will get back to you shortly.</p>
        <hr>
        <p><strong>Your message was:</strong></p>
        <p>${message.replace(/\n/g,'<br>')}</p>
        <p>Best regards,<br>Your Company Name</p>
      `
    }))
    .then(function(response) {
      console.log('Acknowledgement sent to user:', response);
      alert('Your message has been sent. Thank you!');
      form.reset();
    })
    .catch(function(err) {
      console.error('Error sending acknowledgement:', err);
      alert('There was an error sending your message. Please try again later.');
    });
  });
});

