import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod/v4";
import { Prisma } from "@/lib/generated/prisma";

const SubscriptionSchema = z.object({
  fullName: z.string().min(1, "Full name is required").max(100, "Full name must be less than 100 characters"),
  phoneNumber: z.string().min(10, "Phone number is required").max(15, "Phone number must be less than 15 characters").regex(/^\d+$/, "Phone number must contain only digits"),
  allergies: z.string().optional(),
  selectedDays: z.array(z.string()).min(1, "At least one delivery day must be selected"),
  selectedMealType: z.array(z.string()).min(1, "At least one meal type must be selected"),
  selectedPlan: z.string().min(1, "Please select a meal plan"),
  price: z.number().min(0, "Price must be a positive number"),
  userId: z.number(),
});

const UpdateSchema = z.object({
    subscriptionId: z.number(),
    allergies: z.string().optional(),
    selectedDays: z.array(z.string()).min(1, "At least one delivery day must be selected"),
    selectedMealType: z.array(z.string()).min(1, "At least one meal type must be selected"),
    selectedPlan: z.string().min(1, "Please select a meal plan"),
    price: z.number().min(0, "Price must be a positive number"),
});

const DeleteSchema = z.object({
    subscriptionId: z.number(),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const parsedData = SubscriptionSchema.parse(body);

        await prisma.user.update({
            where: { id: parsedData.userId },
            data: {
                fullName: parsedData.fullName,
                phoneNumber: parsedData.phoneNumber
            },
        });

        const subscription = await prisma.subscription.create({
            data: {
                user: { connect: { id: parsedData.userId } },
                mealPlan: parsedData.selectedPlan,
                allergies: parsedData.allergies,
                deliveryDays: parsedData.selectedDays,
                mealType: parsedData.selectedMealType,
                price: parsedData.price,
            }
        });

        return NextResponse.json(subscription, { status: 201 });

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

export async function PUT(req: Request) {
    try {
        const body = await req.json();
        const parsedData = UpdateSchema.parse(body);

        const updatedSubscription = await prisma.subscription.update({
            where: { id: parsedData.subscriptionId },
            data: {
                allergies: parsedData.allergies,
                deliveryDays: parsedData.selectedDays,
                mealType: parsedData.selectedMealType,
                mealPlan: parsedData.selectedPlan,
                price: parsedData.price,
            }
        });

        return NextResponse.json(updatedSubscription, { status: 200 });

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

export async function DELETE(req: Request) {
    try {
        const body = await req.json();
        const parsedData = DeleteSchema.parse(body);

        await prisma.subscription.delete({
            where: { id: parsedData.subscriptionId },
        });

        return NextResponse.json({ message: "Subscription deleted successfully" }, { status: 200 });

    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2025") {
                return NextResponse.json(
                    { error: "Subscription not found" },
                    { status: 404 }
                );
            }
        }

        console.error("Server error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}