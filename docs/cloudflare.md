# Cloudflare Workers preparation

This setup follows Cloudflare's [Next.js Workers guide](https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/) using vinext and the Cloudflare Vite plugin. It was prepared against application commit `a10f582`. Application source and business content are unchanged.

## Local workflows

Use Node.js 22.12 or newer (validated with Node.js 24.21.0), and install the locked dependencies with `npm ci`.

The original Next.js commands remain available:

```sh
npm run dev
npm run build
npm run start
```

Workers commands run alongside Next.js:

```sh
npm run check:vinext
npm run dev:vinext
npm run build:vinext
npm run start:vinext
```

`dev:vinext` uses port 3001. `start:vinext` previews the built Worker locally on port 4173. Neither command publishes a Worker. Generated Worker types and build output stay in the ignored `.cloudflare/` directory. If types are needed before the first build, run `npx cf workers types`.

## Rendering and bindings

`cloudflare.config.ts` defines the Worker, Node.js compatibility, static assets and an `IMAGES` binding. `vite.config.ts` enables the App Router, React Compiler, deterministic CSS Module class names across server/client builds, and request-time image optimization. The local preview emulates the Images binding; the Cloudflare account must support that binding when deployment is later authorized.

There is no CDN/data cache adapter or build-time prerendering. The existing `connection()` call keeps the homepage deadline request-time. The local Worker returns `private, no-cache, no-store` for that page. Training and pricing pages also render successfully; vinext currently renders them on demand in this configuration, while the normal Next.js build still statically renders them.

No domain, DNS, canonical URL, sitemap, robots, structured data or social metadata configuration has been added.

## Validation

```sh
node --test tests/*.test.mjs
npm run lint
npx tsc --noEmit
npm run build
npm run check:vinext
npm run build:vinext
git diff --check
```

With the built Worker preview running in another terminal:

```sh
npm run test:cloudflare
# If using a different preview port:
npm run test:cloudflare -- http://127.0.0.1:3101
```

The preview check verifies all six routes, server-rendered metadata/headings, the current registration deadline, homepage cache headers, built CSS/JavaScript and all five optimized vehicle images. The existing registration tests cover the exact cutoff, month/year rollover and manual overrides.

## Known toolchain warnings

- `vinext check` reports 94% compatibility because it scans `next.config.ts` and still flags `reactCompiler`; the equivalent compiler setting is explicitly enabled in `vite.config.ts` and the build passes.
- The vinext build reports unknown route classifications from static analysis and ineffective dynamic imports inside its own shims. Runtime preview checks validate the actual routes and homepage cache behavior.
- The generated Cloudflare Vite v2 plugin and `cf` CLI are prereleases. Their exact versions are pinned in `package.json` and `package-lock.json`.
- The initial dependency audit reports 12 advisories (8 high, 4 moderate), propagated from `braces`/`fflate` into tooling including the existing Next.js lint stack and vinext dependencies. The suggested forced fixes downgrade Next.js lint tooling/vinext and were not applied. Review upstream fixes before production deployment.
- npm reports unapproved install scripts for `workerd` and `unrs-resolver`. The installed platform binaries supported the validated build and local Worker preview; no blanket script approval was added.

## Deployment boundary

`deploy:vinext` is generated preparation for a later, explicitly authorized task. It has not been run. Do not use it until account/binding requirements and toolchain warnings have been reviewed. Do not enable automatic deployment from Git during this preparation pass.
