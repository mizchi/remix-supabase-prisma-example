import type { GetLoadContext } from "./env";
import { PrismaClient } from "@prisma/client";
import pg from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

// only development mode need
export const getLoadContext: GetLoadContext = async ({ context }) => {
  console.log("MODE: development");

  const pool = new pg.Pool({
    connectionString:
      context.cloudflare.env.DATABASE_URL + "&connection_limit=1",
  });
  const adapter = new PrismaPg(pool);
  const db = new PrismaClient({ adapter });
  return {
    cloudflare: context.cloudflare,
    db,
  };
};
