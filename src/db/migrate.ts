import { migrate } from "drizzle-orm/planetscale-serverless/migrator";
import { connect } from "@planetscale/database";
import { drizzle } from "drizzle-orm/planetscale-serverless";
import drizzleConfig from "../../drizzle.config";
import { fetch } from "undici";

import "dotenv/config";

const runMigrate = async () => {
  // データベースの接続先情報を取得できなければエラーで終了
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined");
  }

  const connection = connect({
    url: process.env.DATABASE_URL,
    fetch,
  });

  // データベースに接続するクライアントを作成
  const db = drizzle(connection);

  console.log("⏳ Running migrations...");

  // 開始時間をメモ
  const start = Date.now();

  // マイグレーションを実行
  // マイグレーションファイルは、drizzle.config.tsのoutに指定したフォルダに作成されます。
  await migrate(db, { migrationsFolder: drizzleConfig.out });

  // 終了時間をメモ
  const end = Date.now();

  // 事項時間を出力
  console.log(`✅ Migrations completed in ${end - start}ms`);

  process.exit(0);
};

runMigrate().catch((err) => {
  console.error("❌ Migration failed");
  console.error(err);
  process.exit(1);
});
