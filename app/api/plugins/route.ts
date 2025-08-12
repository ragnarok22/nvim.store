import { NextResponse } from "next/server";
import { retrievePlugins } from "@/lib/api";

export async function GET() {
  try {
    const data = await retrievePlugins();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch repositories" },
      { status: 500 },
    );
  }
}
