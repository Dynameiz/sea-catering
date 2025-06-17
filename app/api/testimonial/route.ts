import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod/v4";
import { Prisma } from "@/lib/generated/prisma";

const TestimonialSchema = z.object({
    customerName: z.string().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
    message: z.string().min(1, "Review is required"),
    rating: z.number().min(1, "Rating must be at least 1").max(5, "Rating must be at most 5"),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const parsedData = TestimonialSchema.parse(body);

        const newTestimonial = await prisma.testimonial.create({
            data: {
                customerName: parsedData.customerName,
                message: parsedData.message,
                rating: parsedData.rating,
            },
        });

        return NextResponse.json(newTestimonial, { status: 201 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2002") {
                return NextResponse.json(
                    { error: `Unique constraint failed on ${error.meta?.target}` },
                    { status: 400 }
                );
            }
        }

        console.error("Server error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}