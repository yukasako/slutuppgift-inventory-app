import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(req, options) {
  const id = options.params.id;
  try {
    await prisma.user.delete({
      where: { id: Number(id) },
    });
    return new Response(null, {
      status: 204,
    });
  } catch (error) {
    console.log("ERROR", error);
  }
}

// メッセージを返す方法
// export async function DELETE(req, options) {
//   const id = options.params.id;
//   try {
//     await prisma.user.delete({
//       where: { id: Number(id) },
//     });
//     return NextResponse.json(
//       { message: `User ID:${id} has been deleted` },
//       { status: 200 } // ステータスコードは 200 OK
//     );
//   } catch (error) {
//     console.log("ERROR", error);
//   }
// }
