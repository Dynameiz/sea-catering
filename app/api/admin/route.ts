import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod/v4";
import { auth } from "@/lib/auth";
import { Prisma } from "@/lib/generated/prisma";

const DateRangeSchema = z.object({
    startDate: z.string().refine(val => !isNaN(Date.parse(val)), {
        message: "Invalid startDate",
    }),
    endDate: z.string().refine(val => !isNaN(Date.parse(val)), {
        message: "Invalid endDate",
    }),
});

  export async function POST(req: Request) {
    const session = await auth();
    
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
        const body = await req.json();
        const result = DateRangeSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json({ error: result.error }, { status: 400 });
        }

        const { startDate, endDate } = result.data;
        const start = new Date(startDate);
        const end = new Date(endDate);

        const filteredSubscriptions = await prisma.subscription.findMany({
        where: {
            createdAt: {
                gte: start,
                lte: end,
            },
        },
        select: {
            price: true,
            status: true,
            createdAt: true,
            reactivatedAt: true,
        }
        });

        const newSubscriptions = filteredSubscriptions.length;

        const mrr = filteredSubscriptions.reduce((acc, curr) => {
        return acc + (curr.price ?? 0);
        }, 0);

        const activeSubscriptions = await prisma.subscription.count({
            where: {
            status: "ACTIVE",
            },
        });

        const reactivations = await prisma.subscription.count({
            where: {
            reactivatedAt: {
                gte: start,
                lte: end,
            },
            },
        });

        return NextResponse.json({
            newSubscriptions,
            mrr,
            reactivations,
            activeSubscriptions,
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            return NextResponse.json({ error: "Database error" }, { status: 500 });
        }

        console.error("Server error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}