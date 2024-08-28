import { type PlatformProxy } from "wrangler";
import { type AppLoadContext } from "@remix-run/cloudflare";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

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
  const db = new PrismaClient({
    datasources: {
      db: {
        url: context.cloudflare.env.DATABASE_URL,
      },
    },
  }).$extends(withAccelerate());
  return {
    cloudflare: context.cloudflare,
    // TODO: FIX TYPE
    db: db as unknown as PrismaClient,
  };
};
