import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(req) {
  let url = new URL(req.url);
  let items = [];

  const category = url.searchParams.get("category");

  if (category) {
    items = await prisma.item.findMany({
      where: {
        category: {
          contains: category,
          mode: "insensitive",
        },
      },
    });
  } else {
    items = await prisma.item.findMany();
  }
  return NextResponse.json(items);
}
