/**
 * FckSignups — Tool Submission Worker
 *
 * Creates a GitHub issue for every tool submission.
 *
 * Secrets (set via: npx wrangler secret put <NAME>):
 *   GITHUB_TOKEN       - Personal access token with `repo` scope
 *   GITHUB_REPO_OWNER  - "BraveOPotato"
 *   GITHUB_REPO_NAME   - "FckSignups"
 */

import { handleSubmitTool } from "./urlHandlers/handleSubmitTool";
import { handleReportTool } from "./urlHandlers/handleReportTool";
import { handleSuggestTool } from "./urlHandlers/handleSuggestTool";
import { jsonResponse, corsHeaders, type Env } from "./utils";

// Main handler //

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get("Origin") ?? "";

    // verify origin
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }

    // verify the request is headed for /submit
    const url = new URL(request.url);
    if (request.method !== "POST") {
      return jsonResponse({ error: "Not found" }, 404, origin);
    }

    switch (url.pathname) {
      case "/submit-tool":
        return await handleSubmitTool(request, env, origin);
      case "/report-tool":
        return await handleReportTool(request, env, origin);
      case "/suggest-tool":
        return await handleSuggestTool(request, env, origin);
      default:
        return jsonResponse({ error: "Unknown URL" }, 404, origin);
    }
  },
};
