import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const sendEmail = async (to, subject, html, text = '') => {
  try {
    const mailOptions = {
      from: `"Marquee Booking" <${process.env.EMAIL_FROM}>`,
      to,
      subject,
      text,
      html
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Email error:', error);
    return { success: false, error: error.message };
  }
};

export const sendBookingConfirmation = async (booking, userEmail) => {
  const subject = 'Booking Request Received';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Booking Request Received</h2>
      <p>Dear ${booking.guestName},</p>
      <p>Thank you for your booking request. We have received your request and will review it shortly.</p>
      <h3>Booking Details:</h3>
      <ul>
        <li><strong>Event Date:</strong> ${new Date(booking.eventDate).toLocaleDateString()}</li>
        <li><strong>Time:</strong> ${booking.startTime} - ${booking.endTime}</li>
        <li><strong>Event Type:</strong> ${booking.eventType}</li>
        <li><strong>Guest Count:</strong> ${booking.guestCount}</li>
        <li><strong>Status:</strong> ${booking.status}</li>
      </ul>
      <p>We will contact you soon to confirm your booking.</p>
      <p>Best regards,<br>Marquee Booking Team</p>
    </div>
  `;

  return await sendEmail(userEmail, subject, html);
};

export const sendBookingApproval = async (booking, userEmail) => {
  const subject = 'Booking Approved';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Booking Approved</h2>
      <p>Dear ${booking.guestName},</p>
      <p>Great news! Your booking has been approved.</p>
      <h3>Booking Details:</h3>
      <ul>
        <li><strong>Event Date:</strong> ${new Date(booking.eventDate).toLocaleDateString()}</li>
        <li><strong>Time:</strong> ${booking.startTime} - ${booking.endTime}</li>
        <li><strong>Event Type:</strong> ${booking.eventType}</li>
        <li><strong>Guest Count:</strong> ${booking.guestCount}</li>
        <li><strong>Total Amount:</strong> $${booking.totalAmount}</li>
      </ul>
      <p>Please contact us if you have any questions.</p>
      <p>Best regards,<br>Marquee Booking Team</p>
    </div>
  `;

  return await sendEmail(userEmail, subject, html);
};

export const sendBookingCancellation = async (booking, userEmail, reason = '') => {
  const subject = 'Booking Cancelled';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Booking Cancelled</h2>
      <p>Dear ${booking.guestName},</p>
      <p>We regret to inform you that your booking has been cancelled.</p>
      ${reason ? `<p><strong>Reason:</strong> ${reason}</p>` : ''}
      <p>If you have any questions, please contact us.</p>
      <p>Best regards,<br>Marquee Booking Team</p>
    </div>
  `;

  return await sendEmail(userEmail, subject, html);
};

export const sendAdminNotification = async (booking, adminEmail) => {
  const subject = 'New Booking Request';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>New Booking Request</h2>
      <h3>Booking Details:</h3>
      <ul>
        <li><strong>Guest Name:</strong> ${booking.guestName}</li>
        <li><strong>Email:</strong> ${booking.guestEmail}</li>
        <li><strong>Phone:</strong> ${booking.guestPhone}</li>
        <li><strong>Event Date:</strong> ${new Date(booking.eventDate).toLocaleDateString()}</li>
        <li><strong>Time:</strong> ${booking.startTime} - ${booking.endTime}</li>
        <li><strong>Event Type:</strong> ${booking.eventType}</li>
        <li><strong>Guest Count:</strong> ${booking.guestCount}</li>
      </ul>
      <p>Please review and respond to this booking request.</p>
    </div>
  `;

  return await sendEmail(adminEmail, subject, html);
};
