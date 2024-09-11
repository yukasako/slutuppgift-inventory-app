import { NextResponse } from "next/server";
import { verifyJWT } from "./context/JWT";

// このコードは、Next.js のミドルウェアとして、APIリクエストが送信される際にJWTトークンを検証する役割を持っています。
// 主に保護されたAPIエンドポイントへのアクセスを制御するために使用されます。

// unsafeMethods: POST、PUT、DELETE メソッドを使ったリクエストを保護対象として定義しています。
const unsafeMethods = ["POST", "PUT", "DELETE"];

// middleware 関数: リクエストが送信されるたびに実行され、JWTトークンの検証を行います。
export async function middleware(req) {
  const url = new URL(req.url);

  // リクエストが保護対象か確認。(上のunsafeMethods参照)
  if (unsafeMethods.includes(req.method)) {
    // 対象ならば Authorization ヘッダーからトークンを取得して検証します。
    try {
      console.log("ヘッダー", req.headers);
      const bearer = req.headers.get("Authorization") || "";
      const token = bearer.split(" ")?.[1];

      // console.log("Authorization header:", bearer);
      // // ヘッダーの中身を確認
      // console.log("Token extracted:", token);
      // // 抽出されたトークンを確認

      if (!token) {
        throw new Error("no token submitted");
      }

      // トークンが有効な場合、リクエストヘッダーに userId を追加し、処理を続行します。
      const jwtPayload = await verifyJWT(token);
      const headers = new Headers(req.headers);
      headers.set("userId", JSON.stringify(jwtPayload.userId));

      return NextResponse.next({ headers: headers });
    } catch (error) {
      return NextResponse.json(
        {
          error: "You need to login to Add, Edit and Delete.",
        },
        { status: 401 }
      );
    }
  }
}

// 特定のAPIパスに対してこのミドルウェアを適用します。
export const config = {
  matcher: [
    "/api/items/",
    "/api/users/",
    "/api/items/:path*",
    "/api/users/:path*",
  ],
};
