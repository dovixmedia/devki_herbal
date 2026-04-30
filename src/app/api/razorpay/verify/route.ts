import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import dbConnect from '@/lib/mongodb';
import Order from '@/models/Order';

export async function POST(request: NextRequest) {
  try {
    const { 
      razorpay_payment_id, 
      razorpay_order_id, 
      razorpay_signature,
      orderData 
    } = await request.json();

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(body.toString())
      .digest('hex');

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      await dbConnect();
      
      // Create the order in the database
      const order = await Order.create({
        ...orderData,
        status: 'paid',
        paymentMethod: 'razorpay',
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
      });

      // Send email notification to admin
      try {
        const { sendOrderNotification } = await import('@/utils/email');
        await sendOrderNotification(order);
      } catch (emailError) {
        console.error('Failed to send order notification email:', emailError);
        // Don't fail the verification if email fails
      }

      return NextResponse.json({ 
        message: 'Payment verified successfully', 
        orderId: order._id 
      });
    } else {
      return NextResponse.json(
        { message: 'Invalid signature' }, 
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error('Razorpay Verification Error:', error);
    return NextResponse.json(
      { error: 'Failed to verify payment', details: error.message },
      { status: 500 }
    );
  }
}
