import { NextResponse } from "next/server";

// Endpoint de salud: lo usan monitores de uptime y el smoke test post-deploy.
export function GET() {
  return NextResponse.json({
    status: "ok",
    env: process.env.VERCEL_ENV ?? "local",
    commit: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? "dev",
    time: new Date().toISOString(),
  });
}
