import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req) {
  let users = [];
  users = await prisma.user.findMany();
  return NextResponse.json(users);
}
