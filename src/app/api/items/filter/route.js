import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(req) {
  let url = new URL(req.url);
  let items = [];

  // Category複数選択
  const categories = [];
  for (const [key, value] of url.searchParams.entries()) {
    if (key === "category") {
      categories.push(value);
    }
  }
  // 在庫状況チェック
  const quantity = url.searchParams.get("quantity");

  // カテゴリー選択されている場合
  if (categories.length > 0) {
    // 在庫なし
    if (quantity === "0") {
      items = await prisma.item.findMany({
        where: {
          category: {
            in: categories,
            mode: "insensitive",
          },
          quantity: 0,
        },
      });
    }
    // 在庫あり
    else if (quantity === "1") {
      items = await prisma.item.findMany({
        where: {
          category: {
            in: categories,
            mode: "insensitive",
          },
          quantity: {
            not: 0,
          },
        },
      });
    }
    // 在庫状況が指定されていない場合
    else {
      items = await prisma.item.findMany({
        where: {
          category: {
            in: categories,
            mode: "insensitive",
          },
        },
      });
    }
  }
  // カテゴリー未選択。在庫状況のみ選択
  else {
    // 在庫なし
    if (quantity === "0") {
      items = await prisma.item.findMany({
        where: {
          quantity: 0,
        },
      });
    }
    // 在庫あり
    else if (quantity === "1") {
      items = await prisma.item.findMany({
        where: {
          quantity: {
            not: 0,
          },
        },
      });
    }
    // 在庫選択なし
    else {
      items = await prisma.item.findMany();
    }
  }
  return NextResponse.json(items);
}
