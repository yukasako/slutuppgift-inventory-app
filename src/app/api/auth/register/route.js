import { NextResponse } from "next/server";
// import { signJWT } from "@/utils/helpers/authHelpers";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  let body;
  try {
    body = await req.json();
    if (!body.email || !body.password || !body.name) {
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

  // ユーザーの作成　→　データベースに登録
  try {
    const newUser = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: body.password,
      },
    });
    console.log("User registered: ", newUser);
    // JWTトークンの作成
    const token = await signJWT({
      userId: user.id,
    });
    return NextResponse.json({
      newUser,
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
