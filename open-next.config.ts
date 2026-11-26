import { defineCloudflareConfig } from "@opennextjs/cloudflare";

/**
 * Minimal config for the temporary preview deployment.
 * No incremental-cache, queue or tag-cache overrides, so the Worker needs no
 * Durable Objects and can ship as a single module next to the static assets.
 * The managed config in freebuff.open-next.config.ts is still used by Sites.
 */
export default defineCloudflareConfig({});
