# Remix + CloudflarePages + Supabase + Prisma Accelarate


## Development

- Create supabase database and get connection url.
- Put `.dev.vars` like below.

```
DATABASE_URL="..."
```

develop and deploy

- `pnpm dev` - Start dev server (node): it uses `@prisma/adapter-pg`
- `pnpm release` - Release to production(workerd): it uses `@prisma/adapter-pg-worker`

These tasks replaces `functions/[[path]].ts` from `functions-src/{dev,prod}.ts` before run. Beasuce we do not have the way of tree-shake for `functions/` and can not use `@prisma/adapter-pg` on node develoment.

If you want to fix context, edit `load-context.[env].ts`.

## Deployment

- Edit `wrangler.toml`'s `name` by your own.
- Set `DATABASE_URL` for your Cloudflare Pages Env.

```sh
pnpm release
```


## LICENSE

Copyright <2024> <COPYRIGHT miz404@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

