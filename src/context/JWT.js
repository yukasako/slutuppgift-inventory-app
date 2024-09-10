// JWT作成と検証のためのフォルダ。
// JWTは、ヘッダー、ペイロード、シグネチャの3つの部分で構成され、ペイロードが主要情報。

import * as jose from "jose";
const JWT_SECRET = "SECRET"; // 環境変数にするべきだが、とりあえず今はこれで。

// 【JWTを署名するためのシークレットキーをエンコードする】
// TextEncoder を使って、文字列 JWT_SECRETをUTF-8エンコード形式のバイト配列に変換します。このバイト配列がJWTの署名に使用されます。
function encodedSecret() {
  return new TextEncoder().encode(JWT_SECRET);
}

// 【JWT作成→署名】
export async function signJWT(payload) {
  // jose ライブラリの SignJWT クラスを使って、JWTの作成を開始します。
  const token = await new jose.SignJWT(payload)
    // WTのヘッダーにアルゴリズムとして HS256 を設定します。HS256 は HMAC SHA-256 を意味します。
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    // 日時と有効期限の設定
    .setIssuedAt()
    .setExpirationTime("1y")
    // シークレットキーでトークンに署名します。
    .sign(encodedSecret());

  // 戻り値: 署名されたJWTトークンの文字列。
  return token;
}

// 【JWT検証→ペイロードの取得】
export async function verifyJWT(token) {
  const verified = await jose.jwtVerify(token, encodedSecret());
  return verified.payload;
}
