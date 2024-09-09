import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req) {
  let url = new URL(req.url);
  const search = url.searchParams.get("search");
  let items = [];
  //   if (search) {
  //     items = await prisma.item.findMany({
  //       where: {
  //         name: {
  //           contains: search,
  //           mode: "insensitive",
  //         },
  //       },
  //     });
  //   } else {
  items = await prisma.item.findMany();
  //   }
  return NextResponse.json(items);
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

  let newItem;
  try {
    newItem = await prisma.item.create({
      data: {
        name: body.name,
        description: body.description,
        quantity: body.quantity,
        category: body.category,
      },
    });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json(
      {
        message: "Invalid data sent for item creation",
      },
      {
        status: 400,
      }
    );
  }

  return NextResponse.json(newItem, {
    status: 201,
  });
}
