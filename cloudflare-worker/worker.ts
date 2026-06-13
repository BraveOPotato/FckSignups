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

export interface Env {
  GITHUB_TOKEN: string;
  GITHUB_REPO_OWNER: string;
  GITHUB_REPO_NAME: string;
}

interface ToolSubmission {
  name: string;
  description: string;
  url: string;
  tags: string[];
  github: string;
  category: string;
}

// UTILITY FUNCTIONS //

function corsHeaders(origin: string): Record<string, string> {
  const allowed = [
    "https://fcksignups.com",
    "https://www.fcksignups.com",
    "http://localhost:5173",
    "http://localhost:4173",
  ];
  return {
    "Access-Control-Allow-Origin": allowed.includes(origin)
      ? origin
      : allowed[0],
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

function jsonResponse(body: unknown, status: number, origin: string): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders(origin) },
  });
}

// Validates the response object "data" if all its fields are valid.
function validate(data: unknown): ToolSubmission {
  if (!data || typeof data !== "object") throw new Error("Invalid payload");
  const data_obj = data as Record<string, unknown>;

  // If all the required fields exist
  for (const field of ["name", "description", "url", "category"] as const) {
    if (
      !data_obj[field] ||
      typeof data_obj[field] !== "string" ||
      !(data_obj[field] as string).trim()
    ) {
      throw new Error(`Missing required field: ${field}`);
    }
  }

  // Validate the tool link.
  try {
    new URL(data_obj.url as string);
  } catch {
    throw new Error("Invalid URL");
  }
  // Validate the GitHub link.
  if (
    data_obj.github &&
    typeof data_obj.github === "string" &&
    data_obj.github.trim()
  ) {
    try {
      new URL(data_obj.github as string);
    } catch {
      throw new Error("Invalid GitHub URL");
    }
  }

  return {
    name: (data_obj.name as string).trim().slice(0, 100),
    description: (data_obj.description as string).trim().slice(0, 500),
    url: (data_obj.url as string).trim(),
    tags: Array.isArray(data_obj.tags)
      ? (data_obj.tags as string[]).map((t) => String(t).trim()).filter(Boolean)
      : [],
    github: typeof data_obj.github === "string" ? data_obj.github.trim() : "",
    category: (data_obj.category as string).trim(),
  };
}

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
    if (url.pathname !== "/submit" || request.method !== "POST") {
      return jsonResponse({ error: "Not found" }, 404, origin);
    }

    let sub: ToolSubmission;
    try {
      sub = validate(await request.json());
    } catch (err) {
      return jsonResponse({ error: String(err) }, 400, origin);
    }

    const issueBody = `
## Tool Submission

| Field | Value |
|-------|-------|
| **Name** | ${sub.name} |
| **Description** | ${sub.description} |
| **URL** | ${sub.url} |
| **Tags** | ${sub.tags.length ? sub.tags.join(", ") : "—"} |
| **GitHub** | ${sub.github || "—"} |
| **Category** | ${sub.category} |

----
For automation tool:

<SUBMISSION>${sub.name};;${sub.description};;${sub.url};;${sub.tags.length ? sub.tags.join(", ") : "—"};;${sub.github || "—"};;${sub.category}</SUBMISSION>

----
*Submitted via fcksignups.com*
    `.trim();

    const res = await fetch(
      `https://api.github.com/repos/${env.GITHUB_REPO_OWNER}/${env.GITHUB_REPO_NAME}/issues`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.GITHUB_TOKEN}`,
          "Content-Type": "application/json",
          Accept: "application/vnd.github+json",
          "User-Agent": "fcksignups-worker/1.0",
        },
        body: JSON.stringify({
          title: `[Tool Submission Request] ${sub.name}`,
          body: issueBody,
          labels: ["tool-submission"],
        }),
      },
    );

    if (!res.ok) {
      const err = (await res.json().catch(() => ({}))) as { message?: string };
      console.error("GitHub API error:", err.message);
      return jsonResponse(
        { error: "Failed to create GitHub issue" },
        502,
        origin,
      );
    }

    return jsonResponse({ ok: true }, 200, origin);
  },
};
