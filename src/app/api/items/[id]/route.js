import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req, options) {
  const id = options.params.id;

  try {
    const item = await prisma.item.findUniqueOrThrow({
      where: {
        id: Number(item),
      },
    });
    return NextResponse.json(item);
  } catch (error) {
    console.log("ERROR", error);
  }
}

export async function PUT(req, options) {
  const id = options.params.id;

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

  try {
    const updatedItem = await prisma.item.update({
      where: {
        id: Number(id),
      },
      data: {
        name: body.name,
        description: body.description,
        quantity: body.quantity,
        category: body.category,
      },
    });
    return NextResponse.json(updatedItem);
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(req, options) {
  const id = options.params.id;

  try {
    await prisma.item.delete({
      where: { id: Number(id) },
    });
    return new Response(null, {
      status: 204,
    });
  } catch (error) {
    console.log("ERROR", error);
  }
}
