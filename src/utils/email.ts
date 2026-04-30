import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: parseInt(process.env.EMAIL_SERVER_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
});

export async function sendOrderNotification(order: any) {
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail) {
    console.error('ADMIN_EMAIL not set in environment variables');
    return;
  }

  const itemsHtml = order.items
    .map(
      (item: any) => `
    <tr>
      <td style="padding: 10px; border: 1px solid #eee;">${item.name}</td>
      <td style="padding: 10px; border: 1px solid #eee; text-align: center;">${item.quantity}</td>
      <td style="padding: 10px; border: 1px solid #eee; text-align: right;">₹${item.price}</td>
      <td style="padding: 10px; border: 1px solid #eee; text-align: right;">₹${item.price * item.quantity}</td>
    </tr>
  `
    )
    .join('');

  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
      <h2 style="color: #6B2C58; text-align: center;">New Order Received!</h2>
      <p>Hello Admin,</p>
      <p>A new order has been placed on Devki Herbal.</p>
      
      <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
        <h3 style="margin-top: 0; color: #333;">Order Information</h3>
        <p><strong>Order ID:</strong> #${order._id.toString().toUpperCase()}</p>
        <p><strong>Total Amount:</strong> ₹${order.total}</p>
        <p><strong>Payment Method:</strong> ${order.paymentMethod.toUpperCase()}</p>
        <p><strong>Status:</strong> ${order.status.toUpperCase()}</p>
      </div>

      <div style="margin: 20px 0;">
        <h3 style="color: #333;">Shipping Address</h3>
        <p style="background: #fff; padding: 10px; border: 1px solid #eee; border-radius: 5px;">
          ${order.shippingAddress.name}<br>
          ${order.shippingAddress.address}<br>
          ${order.shippingAddress.city}, ${order.shippingAddress.state} - ${order.shippingAddress.zipCode}<br>
          ${order.shippingAddress.country}
        </p>
      </div>

      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <thead>
          <tr style="background: #6B2C58; color: #fff;">
            <th style="padding: 10px; text-align: left;">Product</th>
            <th style="padding: 10px;">Qty</th>
            <th style="padding: 10px; text-align: right;">Price</th>
            <th style="padding: 10px; text-align: right;">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHtml}
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3" style="padding: 15px; text-align: right; font-weight: bold; font-size: 18px;">Total:</td>
            <td style="padding: 15px; text-align: right; font-weight: bold; font-size: 18px; color: #6B2C58;">₹${order.total}</td>
          </tr>
        </tfoot>
      </table>

      <div style="text-align: center; margin-top: 30px; font-size: 12px; color: #888;">
        <p>This is an automated notification from your Devki Herbal store.</p>
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: adminEmail,
      subject: `New Order Received - #${order._id.toString().toUpperCase()}`,
      html: html,
    });
    console.log('Order notification email sent');
  } catch (error) {
    console.error('Error sending order notification email:', error);
  }
}
