import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod/v4";
import bcrypt from "bcrypt";
import { Prisma } from "@/lib/generated/prisma";

const UserSchema = z.object({
    fullName: z.string().min(1, "Full Name is required").max(100, "Full name must be less than 100 characters"),
    username: z.string().min(1, "Username is required").max(50, "Username must be less than 50 characters"),
    phoneNumber: z.string().min(1, "Phone number is required").max(15, "Phone number must be less than 15 characters"),
    password: z.string().min(1, "Password is required").min(8, "Password must have more than 8 characters").max(100, "Password must be less than 100 characters"),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const parsedData = UserSchema.parse(body);

        const existingUser = await prisma.user.findUnique({
            where: { username: parsedData.username },
        });

        const existingPhone = await prisma.user.findUnique({
            where: { phoneNumber: parsedData.phoneNumber },
        });

        if (existingUser) {
            return NextResponse.json({ error: "Username already exists" }, { status: 400 });
        } else if (existingPhone) {
            return NextResponse.json({ error: "Phone number already used" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(parsedData.password, 10);

        const newUser = await prisma.user.create({
            data: {
                username: parsedData.username,
                fullName: parsedData.fullName,
                phoneNumber: parsedData.phoneNumber,
                password: hashedPassword,
                role: "USER",
            },
        });

        return NextResponse.json(newUser, { status: 201 });
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
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
