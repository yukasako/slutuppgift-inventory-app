import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req) {
  let users = [];
  users = await prisma.user.findMany();
  return NextResponse.json(users);
}

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch (error) {
    return NextResponse.json(
      {
        message: "A valid JSON object has to be sent",
      },
      {
        status: 400,
      }
    );
  }

  let newUser;
  try {
    newUser = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: body.password,
      },
    });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json(
      {
        message: "Invalid data sent for user creation",
      },
      {
        status: 400,
      }
    );
  }

  return NextResponse.json(newUser, {
    status: 201,
  });
}
