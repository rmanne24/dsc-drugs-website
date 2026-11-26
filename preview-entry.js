/**
 * Entry point for the temporary preview deployment.
 * Serves prebuilt assets first, then hands everything else (including the
 * /api/enquiry POST route) to the bundled OpenNext worker.
 */
import next from "./.open-next/worker.js";

export default {
  async fetch(request, env, ctx) {
    if (request.method === "GET" || request.method === "HEAD") {
      const asset = await env.ASSETS.fetch(request);
      if (asset.status !== 404) return asset;
      await asset.body?.cancel();
    }
    return next.fetch(request, env, ctx);
  },
};
