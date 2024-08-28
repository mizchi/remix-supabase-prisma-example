import { type PlatformProxy } from "wrangler";
import { type AppLoadContext } from "@remix-run/cloudflare";

// edge
// import { PrismaClient } from "@prisma/client/edge";
// import { withAccelerate } from "@prisma/extension-accelerate";

// pg
/// https://www.prisma.io/docs/orm/prisma-client/deployment/edge/deploy-to-cloudflare#postgresql-traditional
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg-worker";
import { Pool } from "@prisma/pg-worker";
// import PG from "pg";

type Cloudflare = Omit<PlatformProxy<Env>, "dispose">;

declare module "@remix-run/cloudflare" {
  interface AppLoadContext {
    cloudflare: Cloudflare;
    db: PrismaClient;
  }
}

type GetLoadContext = (args: {
  request: Request;
  context: {
    cloudflare: Cloudflare;
  };
}) => Promise<AppLoadContext>;

export const getLoadContext: GetLoadContext = async ({ context }) => {
  const pool = new Pool({
    connectionString: context.cloudflare.env.DATABASE_URL,
  });
  const adapter = new PrismaPg(pool);
  const db = new PrismaClient({ adapter });
  return {
    cloudflare: context.cloudflare,
    db,
  };
};
