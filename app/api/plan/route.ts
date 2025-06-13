import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const plans = await prisma.mealplans.findMany();
        return NextResponse.json(plans);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch meal plans" },
            { status: 500 }
        );
    }
}