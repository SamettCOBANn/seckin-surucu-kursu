<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Repository engineering rules

Production-quality local business website first, portfolio-quality engineering second; neither goal should damage the other. This is the real Seçkin Sürücü Kursu website in Aksaray, Türkiye.

## Scope and workflow

- Keep changes scoped to the requested task. Do not rewrite unrelated files, perform large refactors, or implement future phases without authorization.
- Inspect existing source, configuration, and relevant assets before changing them. Explain significant architectural changes and their tradeoffs.
- Preserve the generated Next.js instruction block above. This file is the canonical repository instruction source; `CLAUDE.md` references it.
- Use meaningful names, small focused components, and logical Git change boundaries. Avoid unnecessary abstractions and complexity added solely for portfolio appeal.
- Do not commit or push unless explicitly requested.

## Stack and rendering

- Preserve TypeScript strict typing, the Next.js App Router, and the existing Tailwind CSS/ESLint stack. Avoid untyped escape hatches.
- Prefer Server Components. Add Client Components only where browser interactivity or state is needed; keep client boundaries narrow.
- Prefer static rendering for stable content. Choose rendering and caching explicitly for time-sensitive information; a Server Component alone does not guarantee fresh request-time data.
- Consult the installed Next.js documentation before selecting APIs. Do not mix Cache Components conventions with the current caching model without an explained configuration change.
- Minimize dependencies and third-party JavaScript. Install a dependency only for a clear technical need within the authorized task; respect explicit no-install instructions.

## Content and domain boundaries

- Keep mutable business information in centralized typed content, planned under `src/content/`, with domain types under `src/types/` and small content readers under `src/lib/content/`.
- Keep vehicle, training offering, pricing, registration, contact, social, and external-service data out of presentation components. Pass typed data into reusable components.
- Keep the content source behind simple reader functions so a future CMS/database can supply the same presentation contracts. Do not add a CMS, database, admin panel, internal API, or generic repository framework without a concrete need.
- Represent missing information explicitly. Do not invent business facts, external URLs, reviews, statistics, prices, imagery, or legal/regulatory claims.
- Distinguish B manual and B automatic training offerings within category B; do not describe them as separate statutory licence classes. Apply accurate terminology to routes, headings, metadata, and body copy.
- Verify detailed eligibility, age, restrictions, documents, examinations, government fees, and MEB claims against current authoritative sources before publication. Record sources and review dates with the content.
- A price-sheet category does not establish that the school offers that training. Keep the published offering catalogue separate from price-list coverage.

## Registration deadlines

- Centralize the policy: monthly cutoff on the 10th at 18:00 in `Europe/Istanbul`, for candidates with complete required documents. The 10th is included up to the closing cutoff; candidates for that period are then reported to MEB.
- Treat 18:00 as the closing boundary: before it, show the current month's deadline; at or after it, show the next month's. Keep this boundary explicit in tests and copy.
- Use calendar-month arithmetic, including December/January rollover; never add 30 days. Do not depend on the server's default timezone.
- Separate the policy, a testable calculation accepting an explicit current instant, and presentation. Allow a period-specific manual override to take precedence without changing presentation components.
- Render the primary upcoming deadline in server-rendered, crawlable HTML using server time. Do not rely entirely on JavaScript, the visitor's device clock, or a build-time timestamp.
- Prefer request-time rendering for routes displaying the exact deadline with the current configuration. Keep it out of the shared root layout to avoid making unrelated routes dynamic. Periodic ISR can serve stale HTML at the boundary; do not present it as an exact scheduler.
- Avoid fake urgency and countdowns. Do not infer opening days or other opening hours from the confirmed closing time.

## Pricing

- Use separate typed structures for course/training fees and official licence/administrative fees. Never merge them into an ambiguous charge or imply both are paid to the school.
- Keep annual amounts, applicable year, actual last-updated dates, source/review information, VAT treatment, and validity notes in centralized pricing data, not in these instructions or components.
- Maintain amounts manually; do not scrape prices or automatically fetch government charges. User-supplied figures and independently verified publication status should remain distinguishable.
- Store money in integer minor units. Validate official-fee component sums; do not invent transition prices, infer manual/automatic price differences, or calculate an all-inclusive cost from incomplete charges.
- Render pricing as accessible, responsive semantic HTML tables/cards with clear category labels and change notices. Source photographs are reference material, never the primary pricing UI.
- Keep optional downloadable price lists consistent with the HTML data. Do not use render time as the last-updated date.

## Real assets and vehicles

- Use `public/images/brand/seckin-logo.png` as the current primary website identity unless superseded. Different yellow/oval decals on vehicles are legitimate business branding, not a data inconsistency.
- Represent vehicles through stable IDs, manufacturer/model, transmission where known, associated offering IDs, optional image metadata (path, alt text, dimensions), and active status.
- Keep the current Ford Puma/manual, Volkswagen Polo/manual, and Hyundai i10/automatic records in data, not presentation components. The A1 and A2 motorcycles must support missing photographs and later image additions through data/asset changes.
- Use only authentic supplied business vehicle images. Do not substitute stock/generated vehicles, invent missing motorcycle images, or fabricate image detail.
- Use `next/image` appropriately, accurate responsive sizes, reserved dimensions, and sensible aspect ratios. Avoid oversized delivery and excessive upscaling; limited source quality is an asset issue, not something to disguise with CSS or fabricated detail.

## Contact, social, and student services

- Derive phone and WhatsApp URLs from centralized contact data. Provide ordinary contact links alongside the planned lightweight bottom-right WhatsApp control; preserve touch access, safe-area spacing, and clearance from privacy UI.
- Give Instagram and TikTok equal visual importance in an early homepage social-proof section after the business introduction, without overpowering the primary conversion CTA. Prefer lightweight profile links/local previews over heavy feeds, scraping, or autoplay embeds.
- Keep social usernames and URLs centralized. Never infer an unknown TikTok destination or publish a broken placeholder link.
- Kursum.app is an external student service: no local authentication, Turkish ID collection/exposure, credential storage, or login iframe. Centralize and verify the web-service and official Google Play destinations before publishing links.
- Make external destinations clear and accessible. If links open a new tab, communicate that behavior and use appropriate security attributes.

## UX, SEO, and validation

- Use semantic HTML, logical headings/landmarks, meaningful link labels, keyboard navigation, visible focus, appropriate contrast, useful alt text, and reduced-motion support. Preserve mobile-first layouts and touch-friendly controls.
- Protect Core Web Vitals with small client bundles, optimized authentic images, sensible font loading, and minimal third-party scripts. Avoid unnecessary sliders, animations, and intrusive popups.
- Build local SEO through useful crawlable content, accurate page-specific metadata, canonical URLs, internal links, sitemap/robots, and structured data consistent with visible verified facts. Never use keyword stuffing, fake claims, doorway pages, or duplicated thin pages.
- Keep future analytics behind a small typed event adapter. Do not collect sensitive data or block contact/navigation when tracking fails; clicks indicate intent, not completed registrations.
- After implementation, run appropriate lint, type, and build validation plus targeted tests for meaningful behavior such as cutoff boundaries, month rollover, overrides, and data integrity. Documentation-only changes need diff/format review, not an application build.
- Report the checks actually run and any failures or limitations. Do not claim completion while required validation is failing. Summarize changed files and final Git status for review.
