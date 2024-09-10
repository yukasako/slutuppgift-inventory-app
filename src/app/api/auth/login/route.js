import { NextResponse } from "next/server";
import { signJWT } from "@/context/JWT";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  let body;
  try {
    body = await req.json();
    if (!body.email || !body.password) {
      throw new Error();
    }
  } catch (error) {
    return NextResponse.json(
      {
        message: "A valid new user object has to be provided",
      },
      {
        status: 400,
      }
    );
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    // パスワードの照合
    if (!user || user.password !== body.password) {
      throw new Error("Invalid login credentials");
    }

    const token = await signJWT({
      userId: user.id,
    });
    return NextResponse.json({
      user,
      token,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 400,
      }
    );
  }
}
