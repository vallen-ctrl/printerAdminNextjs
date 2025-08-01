// src/app/api/products/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/auth'; // pastikan prisma client disini
import { z } from 'zod'; // optional: gunakan Zod untuk validasi

// Optional: Validasi dengan Zod
const productSchema = z.object({
  name: z.string(),
  description: z.string(),
  images: z.string().optional(), // base64 string
  price: z.number(),
  userId: z.string()
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = productSchema.parse(body);

    const imageBuffer = parsed.images ? Buffer.from(parsed.images, 'base64') : null;

    const product = await prisma.products.create({
      data: {
        name: parsed.name,
        description: parsed.description,
        images: "sa",
        price: parsed.price,
        userId: parsed.userId
        // Field lain seperti productStar, totalBuyer otomatis karena ada default
      }
    });

    return NextResponse.json(product, { status: 201 });

  } catch (error: any) {
    console.error('Product creation failed:', error);
    return NextResponse.json(
      { message: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
