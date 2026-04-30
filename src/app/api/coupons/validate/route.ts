import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Coupon from '@/models/Coupon';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const { code, total } = await request.json();

    const coupon = await Coupon.findOne({
      code: code?.toUpperCase?.() || code,
      active: true,
      expiresAt: { $gt: new Date() },
    });

    if (!coupon) {
      return NextResponse.json({ valid: false, message: 'Invalid or expired coupon' });
    }

    if (coupon.maxUses && coupon.usedCount >= coupon.maxUses) {
      return NextResponse.json({ valid: false, message: 'Coupon limit reached' });
    }

    if (coupon.minPurchase && total < coupon.minPurchase) {
      return NextResponse.json({
        valid: false,
        message: `Minimum purchase of $${coupon.minPurchase} required`,
      });
    }

    const discount =
      coupon.discountType === 'percentage'
        ? (total * coupon.discountValue) / 100
        : Math.min(coupon.discountValue, total);

    return NextResponse.json({
      valid: true,
      discount,
      discountType: coupon.discountType,
      discountValue: coupon.discountValue,
    });
  } catch (error) {
    console.error('Coupon validate error:', error);
    return NextResponse.json({ valid: false, message: 'Invalid coupon' });
  }
}
