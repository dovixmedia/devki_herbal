import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Review from '@/models/Review';
import Product from '@/models/Product';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');

    if (!productId) {
      return NextResponse.json({ error: 'productId required' }, { status: 400 });
    }

    const reviews = await Review.find({ productId }).sort({ createdAt: -1 }).lean();
    return NextResponse.json(reviews);
  } catch (error) {
    console.error('Reviews API error:', error);
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const { productId, userName, userEmail, rating, comment } = await request.json();

    if (!productId || !userName || !userEmail || !rating || !comment) {
      return NextResponse.json({ error: 'All fields required' }, { status: 400 });
    }

    const review = await Review.create({
      productId,
      userName,
      userEmail,
      rating: Number(rating),
      comment,
    });

    const reviews = await Review.find({ productId });
    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    await Product.findByIdAndUpdate(productId, {
      rating: Math.round(avgRating * 10) / 10,
      reviewCount: reviews.length,
    });

    return NextResponse.json(review);
  } catch (error) {
    console.error('Reviews API create error:', error);
    return NextResponse.json({ error: 'Failed to create review' }, { status: 500 });
  }
}
