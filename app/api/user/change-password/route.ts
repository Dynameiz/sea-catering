import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod/v4";
import bcrypt from "bcrypt";
import { Prisma } from "@/lib/generated/prisma";

const ChangePasswordSchema = z.object({
    userId: z.number().min(1, "User ID is required"),
    currentPassword: z.string().min(1, "Current password is required").max(100, "Current password must be less than 100 characters"),
    newPassword: z.string().min(8, "New password must have more than 8 characters").max(100, "New password must be less than 100 characters"),
});

export async function PUT(req: Request){
    try {
        const body = await req.json();
        const parsedData = ChangePasswordSchema.parse(body);

        const session = await prisma.user.findUnique({
            where: { id: parsedData.userId },
        });

        if (!session) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const isPasswordValid = await bcrypt.compare(parsedData.currentPassword, session.password);
        if (!isPasswordValid) {
            return NextResponse.json({ error: "Current password is incorrect" }, { status: 400 });
        }

        const hashedNewPassword = await bcrypt.hash(parsedData.newPassword, 10);

        await prisma.user.update({
            where: { id: session.id },
            data: { password: hashedNewPassword },
        });

        return NextResponse.json({ message: "Password changed successfully" }, { status: 200 });
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