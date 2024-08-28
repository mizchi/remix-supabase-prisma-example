import { PrismaClient } from "@prisma/client";
import { PrismaPg as PrismaPgWorker } from "@prisma/adapter-pg-worker";
import { Pool } from "@prisma/pg-worker";
import type { GetLoadContext } from "./env";

export const getLoadContext: GetLoadContext = async ({ context }) => {
  const pool = new Pool({
    connectionString: context.cloudflare.env.DATABASE_URL,
  });
  const adapter = new PrismaPgWorker(pool);
  const db = new PrismaClient({ adapter });
  return {
    cloudflare: context.cloudflare,
    db,
  };
};
