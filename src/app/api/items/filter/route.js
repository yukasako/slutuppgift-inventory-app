import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(req) {
  let url = new URL(req.url);
  let items = [];

  const category = url.searchParams.get("category");
  const quantity = url.searchParams.get("quantity");

  // カテゴリー選択されている場合
  if (category) {
    if (quantity === "0") {
      // 在庫が0のアイテムを取得
      items = await prisma.item.findMany({
        where: {
          category: {
            contains: category,
            mode: "insensitive",
          },
          quantity: 0,
        },
      });
    } else {
      // 在庫が0以外のアイテムを取得
      items = await prisma.item.findMany({
        where: {
          category: {
            contains: category,
            mode: "insensitive",
          },
          quantity: {
            not: 0,
          },
        },
      });
    }
  }
  // 在庫状況のみ指定されている場合
  else if (!category) {
    if (quantity === "0") {
      // 在庫が0のアイテムを取得
      items = await prisma.item.findMany({
        where: {
          quantity: 0,
        },
      });
    } else {
      // 在庫が0以外のアイテムを取得
      items = await prisma.item.findMany({
        where: {
          quantity: {
            not: 0,
          },
        },
      });
    }
  } else {
    items = await prisma.item.findMany();
  }
  return NextResponse.json(items);
}
